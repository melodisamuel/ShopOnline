import { Request, Response } from "express";
import { prisma }from "~/prisma"
import { User } from "@prisma/client"

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

        res.status(201).json(newUser);
    }
}


export const userController: UserController = new UserController();