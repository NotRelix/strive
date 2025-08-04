const { validationResult } = require("express-validator");
const { loginValidator } = require("../middlewares/validations");
const passport = require("passport");

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
          (error) => error.msg === "Invalid login attempt",
        );
        return res.render("login", {
          title: "Login",
          errors: authError ? [authError] : allErrors,
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  },
  passport.authenticate("local", {
    successRedirect: "/folders",
    failureRedirect: "/login",
  }),
];
