const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../config/generateToken");

//Added
const { registerSchema, loginSchema } = require("../helpers/validationSchema");
const nodemailer = require("nodemailer");
const welcomeMail = require("../data/welcomeMail");
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "acd4b8fd341ff7",
    pass: "7484a86d285338",
  },
});

//

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    if (!req.body.name && !req.body.email && !req.body.password) {
      throw new Error("Please Enter All Fields.");
    }
    const result = await registerSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const { name, email, password, picture } = result;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error(`${email} is aleardy registered`);
    }

    const user = await User.create({ name, email, password, picture });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id),
      });

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
    } else {
      res.status(400);
      throw new Error("Failed to Create the User");
    }
  } catch (error) {
    if (error.isJoi === true) res.status(422);
    next(error);
  }
});

const authUser = asyncHandler(async (req, res, next) => {
  try {
    if (!req.body.email && !req.body.password) {
      res.status(400);
      throw new Error("Please Fill all the Feilds");
    }

    const result = await loginSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const { email, password } = result;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    if (error.isJoi === true) res.status(422);
    next(error);
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
