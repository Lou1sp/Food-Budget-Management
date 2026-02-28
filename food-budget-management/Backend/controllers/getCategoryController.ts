import { Request, Response } from "express";
import { Category } from "../models";
import { Transaction } from "../models";
import { fn, col, literal, Op } from "sequelize";
export default async function getCategory(req: Request, res: Response) {
  const userID = (req as any).user.id;
  const monthStr = req.query.month as string;
  const yearStr = req.query.year as string;

  const whereTransaction: any = { user_id: userID };

  if (monthStr && yearStr) {
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    whereTransaction[Op.and] = [
      literal(`EXTRACT(YEAR FROM "transactions"."spent_at") = ${year}`),
      literal(`EXTRACT(MONTH FROM "transactions"."spent_at") = ${month}`),
    ];
  }

  const categories = await Category.findAll({
    attributes: [
      "id",
      "name",
      "user_id",
      [fn("COALESCE", fn("SUM", col("transactions.amount")), 0), "total_spent"],
    ],
    include: [
      {
        model: Transaction,
        as: "transactions",
        attributes: [],
        required: false,
        duplicating: false,
        where: whereTransaction,
      },
    ],
    group: ["Category.id", "Category.user_id"],
    order: [["name", "ASC"]],
    raw: true,
  });

  res.json(categories);
}
