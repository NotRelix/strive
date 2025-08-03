const prisma = require("./prisma");

async function getUser(username) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });
    return user;
  } catch (err) {
    console.error("Failed to get user: ", err);
  }
}

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

async function uploadFile(userId, path) {
  try {
    await prisma.files.create({
      data: {
        path: path,
        userId: userId,
      },
    });
  } catch (err) {
    console.error("Failed to upload file: ", err);
  }
}

async function getFiles(userId) {
  try {
    const files = await prisma.files.findMany({
      where: {
        userId: userId,
      },
    });
    return files;
  } catch (err) {
    console.error("Failed to get files: ", err);
  }
}

module.exports = {
  getUser,
  createUser,
  uploadFile,
  getFiles,
};
