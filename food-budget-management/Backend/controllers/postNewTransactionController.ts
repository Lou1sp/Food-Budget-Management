import { Request, Response } from "express";
import { Transaction } from "../models";

export default async function createTransaction(req: Request, res: Response){
    try{
        const userID = (req as any).user.id;
        const {category_id, amount, spent_at, note} = req.body;

        //Validate input
        if(!category_id || !amount || !spent_at){
            return res.status(400).json({
                message: "Please enter all required fields",
            });
        }

        //Validate datatype
        if(isNaN(Number(amount))){
            return res.status(400).json({
                message: "Amount must be a number",
            })
        }

        const newTransaction = await Transaction.create({
            user_id: userID,
            category_id: Number(category_id),
            amount: Number(amount),
            spent_at: spent_at,
            note,
        });

        return res.status(201).json({
            message: "Transaction created successfully",
            data: newTransaction,
        });
    } catch (error: any){
        console.log(error);
        return res.status(500).json({
            message: error,
        })
    }
}