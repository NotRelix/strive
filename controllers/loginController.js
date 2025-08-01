const { getUser } = require("../db/query");

exports.loginUserGet = (req, res) => {
  res.render("login", {
    title: "Login",
  });
};

exports.loginUserPost = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUser(username);
    if (!user) {
      console.log("User does not exist");
      return res.render("login", {
        title: "Login",
      });
    }
    if (password !== user.password) {
      console.log("Wrong password");
      return res.render("login");
    }
    console.log(`Welcome ${user.username} `);
    return res.redirect("/");
  } catch (err) {
    next(err);
  }
};
