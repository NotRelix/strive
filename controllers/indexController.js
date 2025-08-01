const { createUser } = require("../db/query");

exports.indexGet = (req, res) => {
  res.render("index", {
    title: "Strive",
  });
};

exports.indexPost = async (req, res) => {
  const { username, password } = req.body;
  createUser(username, password);
  res.redirect("/");
};
