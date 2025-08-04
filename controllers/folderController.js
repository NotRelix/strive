const { formatBytes } = require("bytes-formatter");
const { getFiles } = require("../db/query");
const { formatShortDate } = require("../public/js/formatDate");

exports.folderListGet = async (req, res) => {
  const errors = req.flash("errors");
  const userId = req.user.id;
  const files = await getFiles(userId);
  const formattedFiles = files.map((file) => ({
    ...file,
    formatCreatedAt: formatShortDate(file.createdAt),
    formatSize: formatBytes(file.size),
  }));
  res.render("foldersPage", {
    title: "Strive",
    errors: errors,
    files: formattedFiles,
  });
};
