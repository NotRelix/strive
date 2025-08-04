const { validationResult } = require("express-validator");
const { createUser } = require("../db/query");
const { registerValidator } = require("../middlewares/validations");
const bcrypt = require("bcryptjs");

exports.registerUserGet = (req, res) => {
  res.render("register", {
    title: "Register",
  });
};

exports.registerUserPost = [
  registerValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("register", {
          title: "Register",
          errors: errors.array(),
        });
      }
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await createUser(username, hashedPassword);
      return res.redirect("/login");
    } catch (err) {
      next(err);
    }
  },
];
