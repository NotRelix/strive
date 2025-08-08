const express = require("express");
const path = require("node:path");
const indexRouter = require("./routers/indexRouter");
const passport = require("passport");
const { setUserToLocals } = require("./middlewares/auth");
const sessionsMiddleware = require("./config/sessions");
const flash = require("connect-flash");
const app = express();
require("./config/passport");
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(sessionsMiddleware);
app.use(flash());
app.use((req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  next();
});
app.use(passport.session());
app.use(setUserToLocals);
app.use(express.urlencoded({ extended: true }));
app.use(indexRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"))

app.use((err, req, res, next) => {
  console.error(`Oops there seems to be a problem: ${err}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
