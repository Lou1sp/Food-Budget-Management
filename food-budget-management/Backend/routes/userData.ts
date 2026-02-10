import { Router } from "express";
import getBudgetByMonth from "../controllers/getBudgetController";
import getTransactionsByMonth from "../controllers/getTransactionController";
import getCategory from "../controllers/getCategoryController";
import getYearHistory from "../controllers/getYearHistoryController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

router.get("/budgets", authMiddleware, getBudgetByMonth)
router.get("/transactions", authMiddleware, getTransactionsByMonth)
router.get("/categories", authMiddleware, getCategory)
router.get("/monthlyExpense", authMiddleware, getYearHistory)
export default router;