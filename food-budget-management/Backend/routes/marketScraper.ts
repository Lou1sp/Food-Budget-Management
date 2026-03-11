import { Router } from "express";
import { searchMarket } from "../controllers/scrapingController/marketController";
const router = Router();

router.get("/search", searchMarket)
export default router;