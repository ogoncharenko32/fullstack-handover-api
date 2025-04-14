import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { validate, registerSchema, loginSchema } from "../utils/validation.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/create-team", authController.createTeamController);
authRouter.get("/teams", authController.getAllTeamsController);

authRouter.post(
  "/register",
  validate(registerSchema),
  authController.registerController
);
authRouter.post(
  "/login",
  validate(loginSchema),
  authController.loginController
);

authRouter.post("/logout", authMiddleware, authController.logoutController);

export default authRouter;
