const { validationResult } = require("express-validator");
const { createUser } = require("../db/query");
const { registerValidator } = require("../middlewares/validations");

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
      await createUser(username, password);
      return res.redirect("/");
    } catch (err) {
      next(err);
    }
  },
];
