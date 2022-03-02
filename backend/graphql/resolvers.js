const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");
const Message = require("../Models/messageModel");
const { registerSchema, loginSchema } = require("../helpers/validationSchema");
const nodemailer = require("nodemailer");
const generateToken = require("../config/generateToken");
const welcomeMail = require("../data/welcomeMail");
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
};
