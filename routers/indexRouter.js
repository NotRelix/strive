const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const registerRouter = require("./registerRouter");
const loginRouter = require("./loginRouter");
const logoutRouter = require("./logoutRouter");
const fileRouter = require("./fileRouter");
const folderRouter = require("./folderRouter");

indexRouter.get("/", indexController.indexGet);

indexRouter.use("/login", loginRouter);
indexRouter.use("/register", registerRouter);
indexRouter.use("/logout", logoutRouter);
indexRouter.use("/file", fileRouter);
indexRouter.use("/folders", folderRouter);

module.exports = indexRouter;
