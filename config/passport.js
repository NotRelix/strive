const passport = require("passport");
const prisma = require("../db/prisma");
const LocalPassport = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

passport.use(
  new LocalPassport(async (username, password, done) => {
    try {
      const user = await prisma.users.findFirst({
        where: {
          username: username,
        },
      });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }
      done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: id,
      },
    });
    done(null, user);
  } catch (err) {
    return done(err);
  }
});
