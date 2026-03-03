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
const router = Router();

router.get("/budgets", authMiddleware, getBudgetByMonth)
router.get("/transactions", authMiddleware, getTransactionsByMonth)
router.get("/categories", authMiddleware, getCategory)
router.get("/categories-all", authMiddleware, getCategory)
router.get("/monthlyExpense", authMiddleware, getYearHistory)
router.post("/newtransaction", authMiddleware, createTransaction)
router.post("/newcategory", authMiddleware, createCategory)
router.post("/newbudget", authMiddleware, createBudget)
router.delete("/deletecategory", authMiddleware, deleteCategory)
router.patch("/updatebudget", authMiddleware, updateBudget)
export default router;