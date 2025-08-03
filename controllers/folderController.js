exports.folderListGet = (req, res) => {
  const errors = req.flash("errors");
  res.render("foldersPage", {
    title: "Strive",
    errors: errors,
  });
};
