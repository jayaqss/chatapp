const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");
const Message = require("../Models/messageModel");
const { registerSchema, loginSchema } = require("../helpers/validationSchema");
const nodemailer = require("nodemailer");
const generateToken = require("../config/generateToken");
const welcomeMail = require("../data/welcomeMail");
const { array } = require("joi");
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "acd4b8fd341ff7",
    pass: "7484a86d285338",
  },
});

module.exports = {
  createUser: async function ({ userInput }, req) {
    try {
      if (!userInput.name && !userInput.email && !userInput.password) {
        throw new Error("Please Enter All Fields.");
      }
      const result = await registerSchema.validateAsync(userInput, {
        abortEarly: false,
      });

      const { name, email, password, picture } = result;
      const userExists = await User.findOne({ email });

      if (userExists) {
        throw new Error(`${email} is aleardy registered`);
      }

      const user = await User.create({ name, email, password, picture });

      if (user) {
        const response = {
          from: "admin@chatapp.com",
          to: user.email,
          subject: "Sign-up Success",
          html: welcomeMail,
        };

        transport.sendMail(response, (err, success) => {
          if (err) {
            console.log("Error: ", err);
          } else {
            console.log("Success: ", success);
          }
        });
        return {
          _id: user.id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          token: generateToken(user._id),
        };
      } else {
        throw new Error("Failed to Create the User");
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  login: async function ({ loginInput }) {
    try {
      if (!loginInput.email && !loginInput.password) {
        throw new Error("Please Fill all the Feilds");
      }

      const result = await loginSchema.validateAsync(loginInput, {
        abortEarly: false,
      });

      const { email, password } = result;

      const user = await User.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        return {
          _id: user.id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          token: generateToken(user._id),
        };
      } else {
        throw new Error("Invalid Email or Password");
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  accessChat: async function ({ fetchInput }, req) {
    const { userId } = fetchInput;
    // const tempId = "620343637404ddb370bcbd32";

    if (!userId) {
      console.log("UserId param not sent with request");
      throw new Error("UserId param not sent with request");
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      return {
        _id: isChat[0]._id,
        chatName: isChat[0].chatName,
        isGroupChat: isChat[0].isGroupChat,
        users: isChat[0].users,
      };
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        return {
          _id: FullChat._id,
          chatName: FullChat.chatName,
          isGroupChat: FullChat.isGroupChat,
          users: FullChat.users,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
  fetchAllChats: async function ({}, req) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    try {
      // tempId = "620343637404ddb370bcbd32";
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });
          return {
            fetched: results,
          };
        });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
