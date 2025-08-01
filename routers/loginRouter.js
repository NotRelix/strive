const { Router } = require("express");
const loginRouter = Router();
const loginController = require("../controllers/loginController");

loginRouter.get("/", loginController.loginUserGet);
loginRouter.post("/", loginController.loginUserPost);

module.exports = loginRouter;
