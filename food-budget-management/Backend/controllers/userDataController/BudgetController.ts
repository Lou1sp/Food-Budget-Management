import { Request, Response } from "express";
import { Budget } from "../../models";

export default async function getBudgetByMonth(req: Request, res: Response) { 
  try {    
    const userID = (req as any).user.id;
    const { month, year } = req.query;

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

export async function createBudget(req: Request, res: Response){
  try{
    const userID = (req as any).user.id;
    const { amount, month, year } = req.body;
    
    const monthNum = parseInt(month as string);
    const yearNum = parseInt(year as string);

    const newBudget = await Budget.create({
      user_id: userID,
      year: yearNum,
      month: monthNum,
      amount: amount
    });

    return res.status(201).json({
      message: "Budget created successfully",
      data: newBudget,
    });
  } catch(error) {
    console.log(error);
    return res.status(500).json({
      message: error,
    });
  }
}

export async function updateBudget(req: Request, res: Response){
  try{
    const userID = (req as any).user.id;
    const { amount, month, year } = req.body;
    
    const monthNum = parseInt(month as string);
    const yearNum = parseInt(year as string);

    const [updatedCount] = await Budget.update(
      { amount: amount },
      { where: { user_id: userID, month: monthNum, year: yearNum } }
    );

    if (updatedCount === 0) {
      const newBudget = await Budget.create({
        user_id: userID,
        amount: amount,
        month: monthNum,
        year: yearNum,
      });
      return res.status(201).json({
        message: "Budget created",
        data: newBudget,
      });
      
  }
  return res.status(200).json({ message: "Budget updated" });
} catch (err) {
    console.error("UPDATE BUDGET ERROR:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  } 
}