import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userAcc";

export async function signUp(req: Request, res: Response){
    const {username, email, password} = req.body;

    try{
        //Check if the email already exists  
        const existedEmail = await User.findOne({where: {email}});
        if (existedEmail) {
            return res.status(400)
                   .json({
                    message: "Email already in use"
                   });
        
        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        //Init new User
        const newUser = await User.create({username, email, hashedPassword});

        res.status(201).json({
            message: "User created",
            userId: newUser.id
        });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
}