const session = require("express-session");
require("dotenv").config();

const sessionsMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
});

module.exports = sessionsMiddleware;
