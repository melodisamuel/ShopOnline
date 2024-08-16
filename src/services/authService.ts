import { User } from "@prisma/client"
import { prisma } from "~/prisma";
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import { access } from "fs";
import { string } from "joi";
dotenv.config();

class Authservice {

    public async addUser(requestBody: any) {
        const { email, password, firstName, lastName, avatar } = requestBody;
    
        // Check if user's email is unique
        const newUser: User = await prisma.user.create({
            data: {
                email, password, firstName, lastName, avatar
            }
        });
    
        // Create JWT
        const payload = {
            email, firstName, lastName, avatar, role: newUser.role
        };
        // Use a valid expiresIn value
        const accessToken: string = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
    
        return accessToken;
    }

    public async isEmailAlreadyExist(email:string) {
         const userByEmail = await prisma.user.findFirst ({
            where: {
                email
            }
         })

         return userByEmail !== null; 
    }
}

export const authService: Authservice = new Authservice();