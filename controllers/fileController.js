const multer = require("multer");
const { uploadFile } = require("../db/query");
const { fileValidator } = require("../middlewares/validations");
const { validationResult } = require("express-validator");
const upload = multer({ dest: "uploads/" });

exports.fileUploadPost = [
  upload.single("file"),
  fileValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const referer = req.get("Referer") || "/";
      if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect(referer);
      }
      const id = req.user.id;
      const path = req.file.path;
      await uploadFile(id, path);
      return res.redirect(referer)
    } catch (err) {
      next(err);
    }
  },
];
