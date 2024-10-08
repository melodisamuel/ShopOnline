import { User } from "@prisma/client"
import { prisma } from "~/prisma";
import { NextFunction, Request, Response } from "express";
import { authService } from "~/services/auth.service";
import { HTTP_STATUS } from "~/features/globals/constants/http";
import { BadRequestException } from "~/features/globals/middleware/errorMiddleware";

 class AuthController {
    public async registerUser(req: Request, res: Response, next: NextFunction) {

        if (await authService.isEmailAlreadyExist(req.body.email)) {
            next(new BadRequestException('Email must be unique'))
            return;
        }

    const accessToken = await authService.addUser(req.body);
    
        res.status(HTTP_STATUS.CREATED).json({
            message: 'User registered succesfully!',
            accessToken
        });
    }

    public async loginUser(req: Request, res: Response, next: NextFunction) {
       const accessToken = await authService.login(req.body);

        res.status(HTTP_STATUS.CREATED).json({
            message: 'User login succesful!',
            accessToken,
        });
    }
 }

export const authController: AuthController = new AuthController();