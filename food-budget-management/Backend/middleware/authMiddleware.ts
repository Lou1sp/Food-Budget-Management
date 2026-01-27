import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    //Check if json from Frontend contain JWT header
    if(!authHeader){
        return res.status(401).json({message: "No token provided"});
    }
    
    //Decode JWT token 
    const token = authHeader.split(" ")[1]; //Get the token from the header

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: string,
            email: string;
        };

        (req as any).user = decoded; //pin user to Req
        next(); //bring request to controller aka. user pass middleware
    } catch {
        return res.status(401).json({message: "Invalid token"})
    }

}