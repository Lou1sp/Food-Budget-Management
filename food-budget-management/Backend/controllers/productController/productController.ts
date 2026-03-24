import { Request, Response } from "express";
import getProductByCategory from "../../services/productService";
export async function getProductByCategoryandSource(req: Request, res: Response){
    const market = req.query.market as string;
    const category = req.query.category as string;

    const result = await getProductByCategory(category, market);
    res.json(result);
}