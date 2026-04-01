import { Router } from "express";
import { searchWalmartMarket } from "../controllers/marketController/marketController";
import { getProductByCategoryandSource } from "../controllers/productController/productController";
import { searchNoFrillsMarket } from "../controllers/marketController/marketController";
const router = Router();

//These routes are to scrape market
router.get("/walmart", searchWalmartMarket)
router.get("nofrills", searchNoFrillsMarket)

//These routes are to work with scraped data
router.get("/products", getProductByCategoryandSource)
export default router;