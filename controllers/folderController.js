const { formatBytes } = require("bytes-formatter");
const { getFiles, getRootFolder } = require("../db/query");
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
    formatCreatedAt: formatShortDate(root.files.createdAt),
    formatSize: formatBytes(root.files.size),
    isImage: isImage(root.files.fileName),
    isZip: isZip(root.files.fileName),
  }));
  res.render("foldersPage", {
    title: "Strive",
    files: formattedFiles,
  });
};
