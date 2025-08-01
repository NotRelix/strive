const prisma = require("./prisma");

async function createUser(username, password) {
  try {
    await prisma.users.create({
      data: {
        username: username,
        password: password,
      },
    });
  } catch (err) {
    console.error("Failed creating user: ", err);
  }
}

module.exports = {
  createUser,
};
