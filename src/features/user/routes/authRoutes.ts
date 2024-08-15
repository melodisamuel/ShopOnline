import express from "express";
import { validateSchema } from '~/features/globals/middleware/validateMiddleware';
import { userSchemaCreate } from '~/features/interface/userSchema';
import { authController } from "../controller/authController";

const userRoute = express.Router();
userRoute.post('/register', validateSchema(userSchemaCreate),(authController.registerUser));

export default userRoute;