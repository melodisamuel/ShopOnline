import { User } from "@prisma/client"
import { prisma } from "~/prisma";
import { NextFunction, Request, Response } from "express";
import { authservice } from "~/services/authService";
import { HTTP_STATUS } from "~/features/globals/constants/http";

 class AuthController {
    public async registerUser(req: Request, res: Response, next: NextFunction) {
const accessToken = await authservice.addUser(req.body);
    
        res.status(HTTP_STATUS.CREATED).json({
            message: 'User registered succesfully!',
            accessToken
        });
    }
 }

export const authController: AuthController = new AuthController();