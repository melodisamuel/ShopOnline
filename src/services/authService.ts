import { User } from "@prisma/client"
import { prisma } from "~/prisma";
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import { access } from "fs";
import { string } from "joi";
import { IAuthLogin, IAuthRegister } from "~/features/interface/authInterface";
dotenv.config();
import bcrypt from 'bcrypt';
import { BadRequestException } from "~/features/globals/middleware/errorMiddleware";

class Authservice {

    public async addUser(requestBody: IAuthRegister) {
        const { email, password, firstName, lastName, avatar } = requestBody;

        const hashedPassword: string = await bcrypt.hash(password, 10)
    
        // Check if user's email is unique
        const newUser: User = await prisma.user.create({
            data: {
                email, password: hashedPassword, firstName, lastName, avatar
            }
        });
    
        // Create JWT
        const payload = {
            email, firstName, lastName, avatar, role: newUser.role
        };
        // Use a valid expiresIn value
        const accessToken: string = this.generateJWT(payload);

        return accessToken;
    
        return accessToken;
    }

    public async login(requestBody: IAuthLogin) {
        // 1. Get User by Email
        const user: User | null  = await this.getUserByEmail(requestBody.email);
        // 2. Check if email exists
        if(!user){
        throw new BadRequestException('Invalid credentials')
        }
        // 3. Check if passord is correct
        const isMatchPassword: boolean = await bcrypt.compare(requestBody.password, user.password)
        if(!isMatchPassword) {
            throw new BadRequestException('Invalid credentials')
        }
        // 4. Generate JWt -> Access Token
        const payload = {
            email: user.email, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar, role: user.role
        }
        const accessToken: string = await this.generateJWT(payload)

        return accessToken;
    }

    private async getUserByEmail(email: string)  {
        return await prisma.user.findFirst({
            where: {
                email
            }
        })
    }
 
    private generateJWT(payload: any) {
        return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' })
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