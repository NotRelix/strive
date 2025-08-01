const { body } = require("express-validator");
const { getUser } = require("../db/query");

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
];

module.exports = {
  registerValidator,
};
