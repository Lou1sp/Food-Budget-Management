import { searchWalmartProduct } from "../../services/marketService";
import { Request, Response } from "express";

// Scrape Walmart Page By Product
export async function searchWalmartMarket(req: Request, res: Response){
    const product = req.query.product as string;
    const result = await searchWalmartProduct(product);
 
    res.json(result);
}
