import { Request, Response } from "express";
import { Transaction } from "../../models";
import { Op, fn, col } from "sequelize";
import { Category } from "../../models";

export default async function getTransactionsByMonth(
  req: Request,
  res: Response,
) {
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
          attributes: ["name"],
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

export async function getTransactionGroupByDay(req: Request, res: Response) {
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
      attributes: [
        [fn("DATE", col("spent_at")), "date"],
        [fn("SUM", col("amount")), "total_amount"],
      ],
      group: [fn("DATE", col("spent_at"))],
      order: [[fn("DATE", col("spent_at")), "ASC"]],
      raw: true,
    });

    res.json(dailyTransactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch daily transactions" });
  }
}

export async function createTransaction(req: Request, res: Response) {
  try {
    const userID = (req as any).user.id;
    const { category_id, amount, spent_at, note } = req.body;

    //Validate input
    if (!category_id || !amount || !spent_at) {
      return res.status(400).json({
        message: "Please enter all required fields",
      });
    }

    //Validate datatype
    if (isNaN(Number(amount))) {
      return res.status(400).json({
        message: "Amount must be a number",
      });
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
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: error,
    });
  }
}

export async function deleteTransaction(req: Request, res: Response) {
   try{
  const userID = (req as any).user.id;
  const transaction_str = req.query.transaction_id as string;
  const transaction_id = parseInt(transaction_str, 10);

  
   const category = await Transaction.findOne({
      where: { id: Number(transaction_id), user_id: userID },
    });

    if (!category) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await category.destroy();
    return res.status(200).json({ message: "Transaction deleted successfully" });
} catch (error) {
    return res.status(500).json({ message: "Failed to delete transaction", error });
  }
}