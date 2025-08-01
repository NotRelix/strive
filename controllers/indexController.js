const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.indexGet = (req, res) => {
  res.render("index", {
    title: "Strive",
  });
};

exports.indexPost = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.users.create({
    data: {
      username: username,
      password: password,
    },
  });
  console.log(user);
  res.redirect("/");
};
