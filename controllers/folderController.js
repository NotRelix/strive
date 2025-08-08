const { formatBytes } = require("bytes-formatter");
const {
  getRootFolder,
  addFolder,
  getSubfolder,
  getParentFolder,
} = require("../db/query");
const { formatShortDate } = require("../public/js/formatDate");

const imageTypes = ["png", "jpg", "jpeg", "webp"];

function isImage(fileName) {
  return imageTypes.some((type) => fileName.toLowerCase().endsWith(type));
}

function isZip(fileName) {
  return fileName.toLowerCase().endsWith("zip");
}

exports.folderListGet = async (req, res) => {
  const userId = req.user.id;
  const root = await getRootFolder(userId);
  const formattedFiles = root.files.map((file) => ({
    ...file,
    formatCreatedAt: formatShortDate(file.createdAt),
    formatSize: formatBytes(file.size),
    isImage: isImage(file.fileName),
    isZip: isZip(file.fileName),
  }));
  const formattedFolders = root.subfolders.map((folder) => ({
    ...folder,
    formatCreatedAt: formatShortDate(folder.createdAt),
  }));
  const rootFolder = await getRootFolder(userId);
  const folderId = rootFolder.id;
  res.render("foldersPage", {
    title: "Strive",
    files: formattedFiles,
    folders: formattedFolders,
    folderId: folderId,
  });
};

exports.folderAddPost = async (req, res, next) => {
  try {
    const { folderName } = req.body;
    const userId = req.user.id;
    let parentId = req.params?.folderId;
    if (!parentId) {
      const id = req.user.id;
      const rootFolder = await getRootFolder(id);
      parentId = rootFolder.id;
    }
    await addFolder(userId, folderName, parentId);
    const referer = req.get("Referer") || "/";
    return res.redirect(referer);
  } catch (err) {
    next(err);
  }
};

exports.subfolderListGet = async (req, res) => {
  const userId = req.user.id;
  const { folderId } = req.params;
  const subfolder = await getSubfolder(userId, folderId);
  const formattedFiles = subfolder.files.map((file) => ({
    ...file,
    formatCreatedAt: formatShortDate(file.createdAt),
    formatSize: formatBytes(file.size),
    isImage: isImage(file.fileName),
    isZip: isZip(file.fileName),
  }));
  const formattedFolders = subfolder.subfolders.map((folder) => ({
    ...folder,
    formatCreatedAt: formatShortDate(folder.createdAt),
  }));
  let parentId = subfolder.parentId;
  const parentFolders = []
  while (parentId !== null) {
    const parentFolder = await getParentFolder(userId, parentId);
    parentFolders.unshift(parentFolder);
    parentId = parentFolder.parentId;
  }
  console.log(parentFolders);
  res.render("foldersPage", {
    title: "Subfolder",
    files: formattedFiles,
    folders: formattedFolders,
    folderId: folderId,
  });
};
