import {Request, Response} from "express"
import { Budget } from "../models";
export default async function getBudgetByMonth(req: Request, res: Response){
    const userID = (req as any).user.id; //user get from Middleware

    //Use req.query to deal with GET /budgets?month=x&year=y, now we inject x and y to [month, year]
    const {month, year} = req.query;

    const budgets = await Budget.findAll({
        where: {userID, month, year}
    });

    res.json(budgets);
}