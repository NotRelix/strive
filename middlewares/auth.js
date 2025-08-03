const setUserToLocals = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

const redirectIfAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/folders");
  }
  next();
};

const redirectIfNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
};

module.exports = {
  setUserToLocals,
  redirectIfAuthenticated,
  redirectIfNotAuthenticated,
};
