const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    "string.email": `Please Enter a valid email address.`,
    "string.empty": `Please Enter email address.`,
  }),
  password: Joi.string().min(4).max(20).required().messages({
    "string.empty": "Please Enter a password",
    "string.min": "Password length must be at least 4 characters long",
    "string.max":
      "Password length must be less than or equal to 20 characters long",
  }),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
  name: Joi.string().min(3).required().messages({
    "string.min": "Name length must be at least 3 characters long",
    "string.empty": "Please Enter your Name",
  }),
  picture: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    "string.email": `Please Enter a valid email address.`,
    "string.empty": `Please Enter email address.`,
  }),
  password: Joi.string().min(4).max(20).required().messages({
    "string.empty": "Please Enter a password",
    "string.min": "Password length must be at least 4 characters long",
    "string.max":
      "Password length must be less than or equal to 20 characters long",
  }),
});

module.exports = { registerSchema, loginSchema };
