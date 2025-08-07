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
    const user = await prisma.users.create({
      data: {
        username: username,
        password: password,
      },
    });
    await createRootFolder(user.id);
  } catch (err) {
    console.error("Failed creating user: ", err);
  }
}

async function uploadFile(folderId, path, fileName, size) {
  try {
    await prisma.files.create({
      data: {
        path,
        fileName,
        size,
        folderId: parseInt(folderId, 10),
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

async function createRootFolder(userId) {
  try {
    await prisma.folders.create({
      data: {
        userId,
        parentId: null,
        name: "My Drive",
      },
    });
  } catch (err) {
    console.error("Failed to create root folder: ", err);
  }
}

async function getRootFolder(userId) {
  try {
    const rootFolder = await prisma.folders.findFirst({
      where: {
        userId: parseInt(userId, 10),
      },
      include: {
        files: true,
        subfolders: true,
      },
    });
    return rootFolder;
  } catch (err) {
    console.error("Failed to get root folder: ", err);
  }
}

async function getSubfolder(userId, folderId) {
  try {
    const subfolder = await prisma.folders.findFirst({
      where: {
        id: parseInt(folderId, 10),
        userId: parseInt(userId, 10),
      },
      include: {
        files: true,
        subfolders: true,
      },
    });
    return subfolder;
  } catch (err) {
    console.error("Failed to get subfolder: ", err);
  }
}

async function addFolder(userId, name, parentId) {
  try {
    await prisma.folders.create({
      data: {
        userId,
        name,
        parentId,
      },
    });
  } catch (err) {
    console.error("Failed to add folder: ", err);
  }
}

module.exports = {
  getUser,
  createUser,
  uploadFile,
  getFiles,
  getRootFolder,
  getSubfolder,
  addFolder,
};
