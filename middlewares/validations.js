const { body } = require("express-validator");
const { getUser } = require("../db/query");
const bcrypt = require("bcryptjs");

const emptyErr = "must not be empty";

const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyErr}`)
    .bail()
    .isLength({ min: 4, max: 16 })
    .withMessage("Username must be 4 to 16 characters")
    .bail()
    .isAlpha()
    .withMessage("Username must only contain letters")
    .bail()
    .custom(async (username) => {
      const user = await getUser(username);
      if (user) {
        throw new Error("Username is already taken");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least 1 uppercase"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),
];

const loginValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyErr}`)
    .bail()
    .custom(async (username, { req }) => {
      const user = await getUser(username);
      if (!user) {
        throw new Error("Invalid login attempt");
      }
      req.foundUser = user;
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .bail()
    .custom(async (password, { req }) => {
      const user = req.foundUser;
      if (!user) {
        throw new Error("Invalid login attempt");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Wrong password");
      }
      return true;
    }),
];

const fileValidator = [
  body("file").custom((_, { req }) => {
    if (!req.file) {
      throw new Error("File is required");
    }

    const maxSize = 50 * 1024 * 1024;
    if (req.file.size > maxSize) {
      throw new Error("File must be under 50 MB");
    }

    return true;
  }),
];

module.exports = {
  registerValidator,
  loginValidator,
  fileValidator,
};
