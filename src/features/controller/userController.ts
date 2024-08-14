import { NextFunction, Request, Response } from "express";
import { prisma }from "~/prisma"
import { User } from "@prisma/client"
import { userSchemaCreate } from "../interface/userSchema";
import { HTTP_STATUS } from "../globals/constants/http";
import { StatusCodes } from "http-status-codes";
import { BadRequestException } from "../globals/middleware/errorMiddleware";

class UserController {
        public async createUser(req: Request, res: Response, next: NextFunction) {
        const {
            email, password, firstName, lastName, avatar
        } = req.body;

        const isEmailUnique = true;

        if(isEmailUnique) {
           return next(new BadRequestException('Email must be unique'))
        }

        // {
        //     status: `error`,
        //     StatusCode: 400,
        //     message: "Email must be unique"
        // }
  
        // Insert to db
        const newUser: User = await prisma.user.create({
            data : {
            email, password, firstName, lastName, avatar
            }
        })

        res.status(HTTP_STATUS.CREATED).json(newUser);
    }
}


export const userController: UserController = new UserController();