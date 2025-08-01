const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const registerRouter = require("./registerRouter");
const loginRouter = require("./loginRouter");

indexRouter.get("/", indexController.indexGet);

indexRouter.use("/login", loginRouter);
indexRouter.use("/register", registerRouter);

module.exports = indexRouter;
