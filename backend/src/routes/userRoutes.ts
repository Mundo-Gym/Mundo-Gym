import { Router } from "express";
import { getUsers, postUser } from "../controllers/userController";
import requireAuth from "../middlewares/auth";

export const userRouter = Router();
userRouter.get("/", getUsers);
userRouter.post("/", postUser);
