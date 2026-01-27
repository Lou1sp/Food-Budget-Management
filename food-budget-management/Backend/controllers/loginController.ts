import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/userAcc";

export const login = async (req: Request, res: Response) => {
    //Receive json from frontend
    const {email, password} = req.body;
    
    //Check credentials
    const user = await User.findOne({ where: {email} });
    if(!user) {
        return res.status(401).json({message: "Wrong email or password"});
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if(!isMatch) {
        return res.status(401).json({message: "Wrong email or password"});
    }

    //If credentials are all passed, create JWT token
    const token = jwt.sign(
        {
            if: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "30d"
        }
    );

    res.json({
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.username,
        }
    })

}