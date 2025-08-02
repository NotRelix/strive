const passport = require("passport");
const prisma = require("../db/prisma");
const LocalPassport = require("passport-local").Strategy;

passport.use(
  new LocalPassport(async (username, password, done) => {
    try {
      const user = await prisma.users.findFirst({
        where: {
          username: username,
        },
      });
      console.log(user);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (password !== user.password) {
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
