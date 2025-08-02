const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");

fileRouter.post("/upload", fileController.fileUploadPost);

module.exports = fileRouter;
