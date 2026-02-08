import { Router } from "express";
import getBudgetByMonth from "../controllers/getBudgetController";
import getTransactionsByMonth from "../controllers/getTransactionController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

router.get("/budgets", authMiddleware, getBudgetByMonth)
router.get("/transactions", authMiddleware, getTransactionsByMonth)

export default router;