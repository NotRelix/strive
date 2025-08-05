const multer = require("multer");
const { uploadFile, getRootFolder } = require("../db/query");
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
        return req.session.save(() => {
          res.redirect(referer);
        });
      }
      const { path, originalname, size } = req.file;
      let folderId = req.params?.folderId;
      if (!folderId) {
        const id = req.user.id;
        const rootFolder = await getRootFolder(id);
        folderId = rootFolder.id
      }
      await uploadFile(folderId, path, originalname, size);
      req.flash("success", [{ msg: "Successfully uploaded file" }]);
      return req.session.save(() => {
        res.redirect(referer);
      });
    } catch (err) {
      next(err);
    }
  },
];
