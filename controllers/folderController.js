const { getFiles } = require("../db/query");

exports.folderListGet = async (req, res) => {
  const errors = req.flash("errors");
  const userId = req.user.id;
  const files = await getFiles(userId);
  res.render("foldersPage", {
    title: "Strive",
    errors: errors,
    files: files,
  });
};
