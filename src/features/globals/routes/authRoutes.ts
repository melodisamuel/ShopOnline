import express from "express";
import { validateSchema } from '~/features/globals/middleware/validateMiddleware';
import { userSchemaCreate } from '~/features/interface/userSchema';
import { authController } from "../../user/controller/authController";

const authRoute = express.Router();
authRoute.post('/register', validateSchema(userSchemaCreate),(authController.registerUser));
authRoute.post('/login',(authController.loginUser));

export default authRoute;  