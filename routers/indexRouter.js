const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.indexGet);
indexRouter.post("/", indexController.indexPost);

module.exports = indexRouter;
