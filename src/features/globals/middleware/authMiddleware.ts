import { NextFunction, Request, Response } from "express";
import { ForbiddenException, unAuthorizedException } from "./errorMiddleware";
import jwt from 'jsonwebtoken'
import { func } from "joi";

export function verifyUser(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['authorization'] || !req.headers['authorization'].startsWith('Bearer')) {
        throw new unAuthorizedException('Token is invalid, please login again!');
    }
 
    const token = req.headers['authorization'].split(' ')[1];
    try {
        const userDecoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload
        req.currentUser = userDecoded; 
        next()
    } catch (error) {
        throw new unAuthorizedException('Token is invalid, please login again!');
    }
    
  
}

export function checkUserAuthentication(req: Request, res: Response, next: NextFunction) {
    if(!req.currentUser) {
        throw new ForbiddenException('You are not logged in')
    }

    next();
}