const { validationResult } = require("express-validator");
const { getUser } = require("../db/query");
const { loginValidator } = require("../middlewares/validations");

exports.loginUserGet = (req, res) => {
  res.render("login", {
    title: "Login",
  });
};

exports.loginUserPost = [
  loginValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const allErrors = errors.array();
        const authError = allErrors.find(
          (error) => error.msg === "Invalid login attempt"
        );
        return res.render("login", {
          title: "Login",
          errors: authError ? [authError] : allErrors,
        });
      }
      const { username } = req.body;
      console.log(`Welcome ${username} `);
      return res.redirect("/");
    } catch (err) {
      next(err);
    }
  },
];
