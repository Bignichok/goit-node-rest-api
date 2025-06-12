import express from "express";

import { userSchema } from "../schemas/authSchemas.js";

import validateBody from "../helpers/validateBody.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { register, login, logout } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchema), register);
authRouter.post("/login", validateBody(userSchema), login);
authRouter.post("/logout", authMiddleware, logout);

export default authRouter;
