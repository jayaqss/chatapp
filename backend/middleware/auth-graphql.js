const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = req.headers.authorization.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "B5lgSeR7prDwxAJ1");
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.user = await User.findById(decodedToken.id).select("-password");
  req.isAuth = true;
  next();
};
