const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const registerRouter = require("./registerRouter");

indexRouter.get("/", indexController.indexGet);

indexRouter.use("/register", registerRouter);

module.exports = indexRouter;
