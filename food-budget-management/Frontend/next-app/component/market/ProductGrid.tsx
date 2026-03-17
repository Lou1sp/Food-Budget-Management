import type { Product, Category } from "./Grocery"
import ProductCard from './ProductCard';

interface ProductGridProps {
  category: Category;
  products: Product[];
}

export default function ProductGrid({ category, products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="border-t border-[#1a2a1b] px-8 py-16 text-center text-[#3a4e3b]">
        <p className="text-4xl mb-4 opacity-40">🛒</p>
        <p className="text-sm">No products found in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="border-t border-[#1a2a1b] px-8 pb-8">
      {/* Panel header */}
      <div className="flex items-baseline gap-3 py-6">
        <h2 className="font-syne font-bold text-xl text-[#e8ede9]">
          {category.icon} {category.name}
        </h2>
        <span className="text-[13px] text-[#4a6050]">
          {products.length} items
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}