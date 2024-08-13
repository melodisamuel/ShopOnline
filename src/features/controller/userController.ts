import { Request, Response } from "express";
import { prisma }from "~/prisma"
import { User } from "@prisma/client"
import { userSchemaCreate } from "../interface/userSchema";
import { HTTP_STATUS } from "../globals/constants/http";

class UserController {
        public async createUser(req: Request, res: Response) {
        const {
            email, password, firstName, lastName, avatar
        } = req.body;

  
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