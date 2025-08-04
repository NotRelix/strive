const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");
const { redirectIfNotAuthenticated } = require("../middlewares/auth");

folderRouter.get(
  "/",
  redirectIfNotAuthenticated,
  folderController.folderListGet,
);

module.exports = folderRouter;
