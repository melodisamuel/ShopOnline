import express from "express";
import { userController } from "./controller/userController";
import { validateSchema } from "../globals/middleware/validateMiddleware";
import { userSchemaCreate } from "../interface/userSchema";
import { verifyUser } from "../globals/middleware/authMiddleware";

const userRoute = express.Router();

userRoute.post('/', validateSchema(userSchemaCreate), userController.createUser);
userRoute.get('/me', verifyUser, userController.getMe);

export default userRoute;