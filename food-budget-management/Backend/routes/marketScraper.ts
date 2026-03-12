import { Router } from "express";
import { searchWalmartMarket } from "../controllers/scrapingController/marketController";
const router = Router();

router.get("/search", searchWalmartMarket)
export default router;