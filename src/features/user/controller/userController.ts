import { NextFunction, Request, Response } from "express";
import { prisma }from "~/prisma"
import { User } from "@prisma/client"
import { userSchemaCreate } from "../../interface/userSchema";
import { HTTP_STATUS } from "../../globals/constants/http";
import { StatusCodes } from "http-status-codes";
import { InternalExecption } from "../../globals/middleware/errorMiddleware";

class UserController {
        public async createUser(req: Request, res: Response, next: NextFunction) {
 try {
    const {
        email, password, firstName, lastName, avatar
    } = req.body;


    // Insert to db
    const newUser: User = await prisma.user.create({
        data : {
        email, password, firstName, lastName, avatar
        }
    })

    res.status(201).json(newUser);
 } catch (error: any) {
    next (new InternalExecption(error.message))
 }
    }

    public async getMe(req: Request, res: Response, next: NextFunction) {
        return res.status(HTTP_STATUS.OK).json(req.currentUser)
         
    }
}


export const userController: UserController = new UserController();