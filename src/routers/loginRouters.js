import { Router } from "express";
import { LoginControllers } from "../controllers/loginControllers.js";

export const loginRouter = Router();

loginRouter
    .post("/", LoginControllers.login)
    .post("/checktoken/:token", LoginControllers.checkToken);