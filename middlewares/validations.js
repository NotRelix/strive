const { body } = require("express-validator");

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
    .withMessage("Username must only contain letters"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters")
    .bail()
    .isStrongPassword({ minUppercase: 1 })
    .withMessage("Password must contain at least 1 uppercase"),
];

module.exports = {
  registerValidator,
};
