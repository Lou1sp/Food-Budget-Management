import { Request, Response } from "express";
import { Transaction } from "../models";
import { Op, fn, col } from "sequelize";
import {Category} from "../models";

export default async function getTransactionsByMonth(req: Request, res: Response) {
  const userID = (req as any).user.id;

  const month = parseInt(req.query.month as string, 10);
  const year = parseInt(req.query.year as string, 10);

  const from = new Date(year, month - 1, 1);
  const to = new Date(year, month, 0);

  try {
    const dailyTransactions = await Transaction.findAll({
    where: {
      user_id: userID,
      spent_at: {
        [Op.between]: [from, to],
      },
    },
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["name"], // chỉ lấy name
      },
    ],
    attributes: ["id", "amount", "spent_at", "note"],
    order: [["spent_at", "DESC"]],
  });

    res.json(dailyTransactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch daily transactions" });
  }
}

export async function createTransaction(req: Request, res: Response){
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