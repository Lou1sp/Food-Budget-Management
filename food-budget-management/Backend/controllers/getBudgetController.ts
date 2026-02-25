import { Request, Response } from "express";
import { Budget } from "../models";

export default async function getBudgetByMonth(req: Request, res: Response) { 
  try {    
    const userID = (req as any).user.id;
    const { month, year } = req.query;

    console.log('Query params:', { month, year, userID });

    const monthNum = parseInt(month as string);
    const yearNum = parseInt(year as string);


    
    const budgets = await Budget.findOne({
      where: { user_id: userID, month: monthNum, year: yearNum }
    });

    console.log('Query result:', budgets);

    if (budgets == null) {
      console.log('No budget found, returning 0');
      return res.json({ budget: 0 });
    }

    console.log('Returning budget:', budgets.amount);
    res.json({ 
      budget: budgets.amount,
      month: monthNum,
      year: yearNum
    });

  } catch (err) {
    console.error('FULL ERROR:', err); 
    res.status(500).json({ error: "Failed to fetch budget" });
  }
}