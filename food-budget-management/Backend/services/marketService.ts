import { WalmartScraper } from "../scrapers/walmartScraper";
import { Products } from "../models";
import { ProductPrice } from "../models";
import { ProductCategory } from "../models";
export async function searchWalmartProduct(slug: string) {
  const scraper = new WalmartScraper();
  const products = await scraper.scrape(slug);
  //save the products in cache, so later user no need to jump in the database everytime
  
   /* The plan is to create all the category first, for example
   I have a category called "milk", so when user click on that category,
   system will send a request find all products in category "milk" */

   /* Second, when computer scrape, it will scrape by the {slug}. For example, I have
   a category called "bread", when it scrape, it enter exact keywork "bread" so i know all
   returned result can be put right into bread category */

   
   // Find category by slug
  const category = await ProductCategory.findOne({ where: { slug } });
  if (!category) throw new Error(`Cannot find category: ${slug}`);

  for (const item of products) {
  if (!item.id || !item.price) continue;

  try {
    await Products.upsert({
      id: item.id,
      category_id: category.id,
      title: item.title,
      image: item.image,
      brand: item.brand,
      source: "walmart",
      url: item.url,
    });

    const latestPrice = await ProductPrice.findOne({
      where: { product_id: item.id },
      order: [["timestamp", "DESC"]],
    });

    const newPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));

    if (isNaN(newPrice)) {
      console.log(`⚠️ Invalid price: "${item.price}", skipping...`);
      continue;
    }

    if (!latestPrice || Number(latestPrice.price) !== newPrice) {
      await ProductPrice.create({
        product_id: item.id,
        price: newPrice,
        price_per_unit: item.pricePerUnit,
        currency: "CAD",
        timestamp: new Date().toISOString().split("T")[0],
      });
    }
  } catch (err) {
    // Log lỗi nhưng không dừng vòng lặp
    console.error(`❌ Error saving product ${item.id}:`, err);
    continue;
  }
}
}
