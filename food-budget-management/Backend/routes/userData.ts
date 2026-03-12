import { Router } from "express";
import getBudgetByMonth from "../controllers/userDataController/BudgetController";
import getTransactionsByMonth from "../controllers/userDataController/TransactionController";
import getCategory from "../controllers/userDataController/CategoryController";
import getYearHistory from "../controllers/userDataController/YearHistoryController";
import { createTransaction } from "../controllers/userDataController/TransactionController";
import { createCategory } from "../controllers/userDataController/CategoryController";
import { deleteCategory } from "../controllers/userDataController/CategoryController";
import { createBudget } from "../controllers/userDataController/BudgetController";
import { authMiddleware } from "../middleware/authMiddleware";
import { updateBudget } from "../controllers/userDataController/BudgetController";
import { deleteTransaction } from "../controllers/userDataController/TransactionController";
import { getTransactionGroupByDay } from "../controllers/userDataController/TransactionController";
import { searchWalmartMarket } from "../controllers/scrapingController/marketController";
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

router.get("/market/search", searchWalmartMarket)
export default router;