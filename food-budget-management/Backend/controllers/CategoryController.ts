import { Request, Response } from "express";
import { Category } from "../models";
import { Transaction } from "../models";
import { fn, col, literal, Op } from "sequelize";

//Get category and total expense by category
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

//Create new Category
export  async function createCategory(req: Request, res: Response) {
  try {
    const userID = (req as any).user.id;
    const { name } = req.body;
    
    const newCategory = await Category.create({
      user_id: userID,
      name: name,
    });

    return res.status(201).json({
      message: "Transaction created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error,
    });
  }
}

//Delete a Category
export async function deleteCategory(req: Request, res: Response){
try{
  const userID = (req as any).user.id;
  const category_str = req.query.category_id as string;
  const category_id = parseInt(category_str, 10);

  
   const category = await Category.findOne({
      where: { id: Number(category_id), user_id: userID },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();
    return res.status(200).json({ message: "Category deleted successfully" });
} catch (error) {
    return res.status(500).json({ message: "Failed to delete category", error });
  }
}
