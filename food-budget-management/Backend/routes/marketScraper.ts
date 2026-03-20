import { Router } from "express";
import { searchWalmartMarket } from "../controllers/marketController/marketController";

import { getProductByCategoryandSource } from "../controllers/productController/productController";
const router = Router();

router.get("/search", searchWalmartMarket)
router.get("/products", getProductByCategoryandSource)
export default router;