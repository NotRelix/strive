const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");

fileRouter.post("/:folderId/upload", fileController.fileUploadPost);

module.exports = fileRouter;
