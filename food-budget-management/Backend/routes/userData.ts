import { Router } from "express";
import getBudgetByMonth from "../controllers/BudgetController";
import getTransactionsByMonth from "../controllers/TransactionController";
import getCategory from "../controllers/CategoryController";
import getYearHistory from "../controllers/YearHistoryController";
import { createTransaction } from "../controllers/TransactionController";
import { createCategory } from "../controllers/CategoryController";
import { deleteCategory } from "../controllers/CategoryController";
import { createBudget } from "../controllers/BudgetController";
import { authMiddleware } from "../middleware/authMiddleware";
import { updateBudget } from "../controllers/BudgetController";
import { deleteTransaction } from "../controllers/TransactionController";
import { getTransactionGroupByDay } from "../controllers/TransactionController";
import { searchMarket } from "../controllers/marketController";
const router = Router();

router.get("/budgets", authMiddleware, getBudgetByMonth)
router.get("/transactions", authMiddleware, getTransactionsByMonth)
router.get("/transactionsgroupbyday", authMiddleware, getTransactionGroupByDay)
router.get("/categories", authMiddleware, getCategory)
router.get("/categories-all", authMiddleware, getCategory)
router.get("/monthlyExpense", authMiddleware, getYearHistory)
router.post("/newtransaction", authMiddleware, createTransaction)
router.post("/newcategory", authMiddleware, createCategory)
router.post("/newbudget", authMiddleware, createBudget)
router.delete("/deletecategory", authMiddleware, deleteCategory)
router.delete("/deletetransaction", authMiddleware, deleteTransaction)
router.patch("/updatebudget", authMiddleware, updateBudget)

router.get("/market/search", searchMarket)
export default router;