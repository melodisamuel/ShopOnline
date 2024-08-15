import { User } from "@prisma/client"
import { prisma } from "~/prisma";
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import { access } from "fs";
dotenv.config();

class Authservice {

    public async addUser(requestBody: any) {
  
   const {
    email, password, firstName, lastName, avatar
} = requestBody;

   // Insert to db
   const newUser: User = await prisma.user.create({
    data : {
    email, password, firstName, lastName, avatar
    }
}) 
// Create jwt
const payload = {
    email, firstName, lastName, avatar, role: newUser.role
}
const accessToken:string = jwt.sign(payload, process.env.JWT_SECRET!)

    return  accessToken;
    }
}

export const authservice: Authservice = new Authservice();