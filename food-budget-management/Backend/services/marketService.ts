import { WalmartScraper } from "../scrapers/walmartScraper";
import { Products } from "../models";
import { ProductPrice } from "../models";
import { ProductCategory } from "../models";
export async function searchWalmartProduct(slug: string) {
  const scraper = new WalmartScraper();
  const products = await scraper.scrape(slug);
  //save the products in cache, so later user no need to jump in the database everytime
  
  // Find category by slug
  const category = await ProductCategory.findOne({ where: { slug } });
  if (!category) throw new Error(`Cannot find category: ${slug}`);

  // 1. Prepare IDs - Get all the products that has id and price, and map each of it with its own id
  const productIds = products.filter((p) => p.id && p.price).map((p) => p.id);

  // 2. Get latest prices (1 query) - Return all price record for each of productsId above
  const latestPricesRaw = await ProductPrice.findAll({
    where: { product_id: productIds },
    order: [["timestamp", "DESC"]],
  });

  // 3. Build map (product_id -> latest price)
  const latestPriceMap = new Map<string, any>();
  // Because price are sorted in DESC, so just need to check if the product exist, if yes, it is the current newest price
  for (const p of latestPricesRaw) {
    if (!latestPriceMap.has(p.product_id)) {
      latestPriceMap.set(p.product_id, p);
    }
  }

  // 4. Process products
  await Promise.all(
    products.map(async (item) => {
      if (!item.id || !item.price) return;

      try {
        const priceString = item.price;
        let newPrice: number;
        if(priceString.includes("¢")){
          newPrice = parseFloat(priceString.replace(/[^0-9.]/g, "")) / 100;
        }
        else newPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        if (isNaN(newPrice)) return;
        // Upsert is used when a product is already exist, it will just update new information
        await Products.upsert({
          id: item.id,
          category_id: category.id,
          title: item.title,
          image: item.image,
          brand: item.brand,
          source: "walmart",
          url: item.url,
        });

        const latestPrice = latestPriceMap.get(item.id);

        if (!latestPrice || Number(latestPrice.price) !== newPrice) {
          await ProductPrice.create({
            product_id: item.id,
            price: newPrice,
            price_per_unit: item.pricePerUnit,
            currency: "CAD",
            timestamp: new Date(),
          });
        }
      } catch (err) {
        console.error(`❌ Error saving product ${item.id}:`, err);
      }
    }),
  );
}
