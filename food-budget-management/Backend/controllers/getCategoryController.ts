import { Request, Response } from "express";
import { Category } from "../models";
import { Transaction } from "../models";
import { fn, col, literal, Op } from "sequelize";
export default async function getCategory(req: Request, res: Response) {
  const userID = (req as any).user.id;

  const month = parseInt(req.query.month as string, 10);
  const year = parseInt(req.query.year as string, 10);

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
        required: false, // LEFT JOIN
        duplicating: false,
        where: {
          user_id: userID,
          [Op.and]: [
            literal(`EXTRACT(YEAR FROM "transactions"."spent_at") = ${year}`),
            literal(`EXTRACT(MONTH FROM "transactions"."spent_at") = ${month}`),
          ],
        },
      },
    ],
    group: ["Category.id", "Category.user_id"],
    order: [["name", "ASC"]],
    raw: true,
  });

  console.log("Query result: ", categories);
  res.json(categories);
}


