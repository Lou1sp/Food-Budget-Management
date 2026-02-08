import { Request, Response } from "express";
import { Transaction } from "../models";
import { Op } from "sequelize";

export default async function getTransactionsByMonth(req: Request, res: Response){
    const userID = (req as any).user.id; //user get from Middleware
    
    //Month and Year now are just strings, we need to convert to Integer
    const month = parseInt(req.query.month as string, 10);
    const year = parseInt(req.query.year as string, 10);

    //Get the time range. Note that in JS, 0 -> Jan, 1 -> Feb,.. and so on. That's why month - 1
    const from = new Date(year, month - 1, 1);
    const to = new Date(year, month, 0);

    const transactions = await Transaction.findAll({
        where: {
            user_id: userID,
            spent_at: {[Op.between ]: [from, to]},
        },
        order: [['spent_at', 'ASC']],
    });

    res.json(transactions)
}