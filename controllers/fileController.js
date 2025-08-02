const multer = require("multer");
const upload = multer({ dest: "uploads/" });

exports.fileUploadPost = [
  upload.single("picture"),
  (req, res) => {
    console.log(req.file);
  },
];
