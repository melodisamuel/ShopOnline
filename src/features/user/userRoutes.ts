import express from "express";
import { userController } from "../controller/userController";

const userRoute = express.Router();

userRoute.post('/', userController.createUser);

export default userRoute;