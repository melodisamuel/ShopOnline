import { NextFunction, Request, Response } from "express";

export function verifyUser(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers);
    
}