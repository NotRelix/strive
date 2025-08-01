const { validationResult } = require("express-validator");
const { createUser } = require("../db/query");
const { registerValidator } = require("../middlewares/validations");

exports.indexGet = (req, res) => {
  res.render("index", {
    title: "Strive",
  });
};

exports.indexPost = [
  registerValidator,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("index", {
        title: "Strive",
        errors: errors.array(),
      });
    }
    const { username, password } = req.body;
    await createUser(username, password);
    res.redirect("/");
  },
];
