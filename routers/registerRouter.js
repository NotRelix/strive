const { Router } = require("express");
const registerRouter = Router();
const registerController = require("../controllers/registerController");
const { redirectIfAuthenticated } = require("../middlewares/auth");

registerRouter.get(
  "/",
  redirectIfAuthenticated,
  registerController.registerUserGet,
);
registerRouter.post(
  "/",
  redirectIfAuthenticated,
  registerController.registerUserPost,
);

module.exports = registerRouter;
