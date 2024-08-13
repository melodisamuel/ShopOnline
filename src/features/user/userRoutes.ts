import express from "express";
import { userController } from "../controller/userController";
import { validateSchema } from "../globals/middleware/validateMiddleware";
import { userSchemaCreate } from "../interface/userSchema";

const userRoute = express.Router();

userRoute.post('/', validateSchema(userSchemaCreate), userController.createUser);

export default userRoute;