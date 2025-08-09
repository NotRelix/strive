const multer = require("multer");
const { uploadFile, getRootFolder } = require("../db/query");
const { fileValidator } = require("../middlewares/validations");
const { validationResult } = require("express-validator");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const supabase = require("../config/supabase");

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

      const { buffer, originalname, size, mimetype } = req.file;

      let folderId = req.params?.folderId;
      if (!folderId) {
        const id = req.user.id;
        const rootFolder = await getRootFolder(id);
        folderId = rootFolder.id;
      }
      const safeOriginalName = originalname
        .normalize("NFKD")
        .replace(/[^\x00-\x7F]/g, "")
        .replace(/\s+/g, "_");
      const fileName = `${Date.now()}-${safeOriginalName}`;
      const { data, error } = await supabase.storage
        .from("uploads")
        .upload(fileName, buffer, { contentType: mimetype });
      if (error) throw error;
      const { publicUrl } = supabase.storage
        .from("uploads")
        .getPublicUrl(fileName).data;
      await uploadFile(folderId, publicUrl, originalname, size);
      req.flash("success", [{ msg: "Successfully uploaded file" }]);
      return req.session.save(() => {
        res.redirect(referer);
      });
    } catch (err) {
      next(err);
    }
  },
];
