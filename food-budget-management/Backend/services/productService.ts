import { sequelize } from "../models";
import { QueryTypes } from "sequelize";
export default async function getProductByCategory(category: string, source: string){
   const products = await sequelize.query(
    `
    SELECT
      p.id,
      p.title,
      p.image,
      p.brand,
      p.url,
      pp.price,
      pp.price_per_unit,
      pp.currency
    FROM products p
    INNER JOIN "productCategories" pc ON pc.id = p.category_id
    INNER JOIN product_price pp ON pp.product_id = p.id
    WHERE
      p.source = :source
      AND pc.name = :category
      AND pp.timestamp = (
        SELECT MAX(pp2.timestamp)
        FROM product_price pp2
        WHERE pp2.product_id = p.id
      )
    ORDER BY p.title ASC
    `,
    {
      replacements: { source, category },
      type: QueryTypes.SELECT,
    }
  );

  return products;
}