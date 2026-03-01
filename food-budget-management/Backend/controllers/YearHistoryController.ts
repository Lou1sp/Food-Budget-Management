import { Request, Response } from "express";
import { Transaction } from "../models";
import { fn, col, literal, Op } from "sequelize";
export default async function getYearHistory(req: Request, res: Response) {
  const userID = (req as any).user.id;

  const year = parseInt(req.query.year as string, 10);
  const monthlyExpense = await Transaction.findAll({
    attributes: [
      [fn("EXTRACT", literal("MONTH FROM spent_at")), "month"],
      [fn("SUM", col("amount")), "total_spent"],
    ],
    where: {
      user_id: userID,
      spent_at: {
        [Op.between]: [new Date(`${year}-01-01`), new Date(`${year}-12-31`)],
      },
    },
    group: [literal(`EXTRACT(MONTH FROM spent_at)`) as unknown as string],
    order: [literal(`EXTRACT(MONTH FROM spent_at)`) as unknown as string],
    raw: true,
  });

  res.json(monthlyExpense);
}
