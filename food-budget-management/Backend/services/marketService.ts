import { scrapeWalmart } from "../scrapers/walmartScraper";

export async function searchProduct(product: string){
    const walmart = await scrapeWalmart(product);
    
    return {
        walmart
    };
}