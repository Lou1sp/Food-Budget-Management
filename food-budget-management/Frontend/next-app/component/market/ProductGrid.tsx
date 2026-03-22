// component/market/ProductGrid.tsx
import type { Products, Category } from "./Grocery"
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

interface ProductGridProps {
  category: Category;
  products: Products[];
}

export default function ProductGrid({ category, products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-8 py-16 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-6 opacity-30">🛒</div>
          <p className="text-white/60 text-lg mb-2">No products found</p>
          <p className="text-white/40 text-sm">Try selecting a different category</p>
        </div>
      </motion.div>
    );
  }
  
  return (
    <div className="px-8 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3 py-6 mb-4 items-center"
      >
        <div className="flex items-center gap-3 justify-center">
          <div className="text-3xl">{category.icon}</div>
          <h2 className="text-2xl font-bold bg-white bg-clip-text text-transparent">
            {category.name}
          </h2>
        </div>
        <div className="px-3 py-1 bg-amber-500/20 rounded-full">
          <span className="text-xs font-semibold text-amber-400">{products.length} items</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-5 gap-6">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}