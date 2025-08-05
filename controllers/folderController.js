const { formatBytes } = require("bytes-formatter");
const { getRootFolder, addFolder } = require("../db/query");
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
  res.render("foldersPage", {
    title: "Strive",
    files: formattedFiles,
    folders: root.subfolders,
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
    const referer = req.get("Referer") || "/"
    return res.redirect(referer);
  } catch (err) {
    next(err);
  }
};
