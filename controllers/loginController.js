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
          (error) => error.msg === "Invalid login attempt"
        );
        req.flash("errors", authError ? [authError] : allErrors);
        return req.session.save(() => {
          res.redirect("/login");
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  },
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        req.flash("success", [{ msg: "Welcome back!" }]);
        return req.session.save(() => {
          res.redirect("/folders");
        });
      });
    })(req, res, next);
  },
];
