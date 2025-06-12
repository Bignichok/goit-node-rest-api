import express from "express";

import { userSchema } from "../schemas/authSchemas.js";

import validateBody from "../helpers/validateBody.js";

import { register, login } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchema), register);
authRouter.post("/login", validateBody(userSchema), login);

export default authRouter;
