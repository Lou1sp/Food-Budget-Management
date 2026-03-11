import { searchProduct } from "../../services/marketService";
import { Request, Response } from "express";
export async function searchMarket(req: Request, res: Response){
    const product = req.query.product as string;
    const result = await searchProduct(product);
 
    res.json(result);
}