import { Router } from "express";
import { register, login, loginDriverHandler } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/driver-login", loginDriverHandler);
