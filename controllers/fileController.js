const multer = require("multer");
const { uploadFile } = require("../db/query");
const upload = multer({ dest: "uploads/" });

exports.fileUploadPost = [
  upload.single("file"),
  async (req, res) => {
    try {
      const id = req.user.id;
      const path = req.file.path;
      await uploadFile(id, path)
    } catch (err) {
      next(err);
    }
  },
];
