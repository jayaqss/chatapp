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
      // req.user = "620343637404ddb370bcbd32";
      Chat.find({ users: { $elemMatch: { $eq: req.user } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });
          console.log(results);
          return {
            fetched: results,
          };
        });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createGroupChat: async function ({ groupChatInput }, req) {
    // req.user = "620343637404ddb370bcbd32";
    if (!groupChatInput.users || !groupChatInput.chatName) {
      throw new Error("Please Fill all the feilds");
    }

    var users = JSON.parse(groupChatInput.users);

    if (users.length < 2) {
      return res.send("More than 2 users are required to form a group chat");
    }

    users.push(req.user);

    try {
      const groupChat = await Chat.create({
        chatName: groupChatInput.chatName,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
      });

      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      return {
        _id: fullGroupChat._id,
        chatName: fullGroupChat.chatName,
        isGroupChat: fullGroupChat.isGroupChat,
        users: fullGroupChat.users,
        groupAdmin: fullGroupChat.groupAdmin,
      };
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  },

  renameGroup: async function ({ renameGroupInput }, res) {
    const { chatId, chatName } = renameGroupInput;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      throw new Error("Chat Not Found");
    } else {
      return {
        _id: updatedChat._id,
        chatName: updatedChat.chatName,
        isGroupChat: updatedChat.isGroupChat,
        users: updatedChat.users,
        groupAdmin: updatedChat.groupAdmin,
      };
    }
  },
  addGroup: async function ({ addGroupInput }) {
    const { chatId, userId } = addGroupInput;

    // check if the requester is admin

    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      const error = new Error("Chat Not Found");
      error.code = 404;
      throw error;
    } else {
      return {
        _id: added._id,
        chatName: added.chatName,
        isGroupChat: added.isGroupChat,
        users: added.users,
        groupAdmin: added.groupAdmin,
      };
    }
  },
  removeGroup: async function ({ removeGroupInput }) {
    const { chatId, userId } = removeGroupInput;

    // check if the requester is admin
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      const error = new Error("Chat Not Found");
      error.code = 404;
      throw error;
    } else {
      return {
        _id: removed._id,
        chatName: removed.chatName,
        isGroupChat: removed.isGroupChat,
        users: removed.users,
        groupAdmin: removed.groupAdmin,
      };
    }
  },
  search: async function ({ searchInput }, req) {
    // req.user = "620343637404ddb370bcbd32";
    const keyword = searchInput.search
      ? {
          $or: [
            { name: { $regex: searchInput.search, $options: "i" } },
            { email: { $regex: searchInput.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user } });
    return { searchValue: users };
  },
};
