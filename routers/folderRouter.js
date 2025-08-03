const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");

folderRouter.get("/", folderController.folderListGet);

module.exports = folderRouter;
