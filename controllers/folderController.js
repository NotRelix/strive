const { formatBytes } = require("bytes-formatter");
const { getFiles } = require("../db/query");
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
  const files = await getFiles(userId);
  const formattedFiles = files.map((file) => ({
    ...file,
    formatCreatedAt: formatShortDate(file.createdAt),
    formatSize: formatBytes(file.size),
    isImage: isImage(file.fileName),
    isZip: isZip(file.fileName),
  }));
  res.render("foldersPage", {
    title: "Strive",
    files: formattedFiles,
  });
};
