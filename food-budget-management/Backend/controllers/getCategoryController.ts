import { Request, Response } from "express";
import { Category } from "../models";
import { Transaction } from "sequelize";
export default async function getCategory(req: Request, res: Response) {
  const userID = (req as any).user.id;

  const month = parseInt(req.query.month as string, 10);
  const year = parseInt(req.query.year as string, 10);

  const from = new Date(year, month - 1, 1);
  const to = new Date(year, month, 0);

  const categories = await Category.findAll({
    where: { user_id: userID },
  });

  console.log("Query result: ", categories);

  res.json(categories);
}

//This is the query for this controller
/*
SELECT c.id, c.name, c.user_id,
COALESCE (SUM(t.amount), 0) AS "total_spent"
FROM "marketCategory" AS c
LEFT JOIN transactions as t
  ON c.id = t.category_id
  AND t.user_id = c.user_id
WHERE EXTRACT(YEAR FROM t.spent_at) = 2026 AND EXTRACT(MONTH FROM t.spent_at) = 2
GROUP BY c.id, c.user_id 
ORDER BY c.name
*/