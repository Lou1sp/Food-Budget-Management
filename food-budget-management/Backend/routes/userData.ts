import { Router } from "express";
import getBudgetByMonth from "../controllers/BudgetController";
import getTransactionsByMonth from "../controllers/TransactionController";
import getCategory from "../controllers/CategoryController";
import getYearHistory from "../controllers/YearHistoryController";
import { createTransaction } from "../controllers/TransactionController";
import { createCategory } from "../controllers/CategoryController";
import { deleteCategory } from "../controllers/CategoryController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

router.get("/budgets", authMiddleware, getBudgetByMonth)
router.get("/transactions", authMiddleware, getTransactionsByMonth)
router.get("/categories", authMiddleware, getCategory)
router.get("/categories-all", authMiddleware, getCategory)
router.get("/monthlyExpense", authMiddleware, getYearHistory)
router.post("/newtransaction", authMiddleware, createTransaction)
router.post("/newcategory", authMiddleware, createCategory)
router.delete("/deletecategory", authMiddleware, deleteCategory)
export default router;