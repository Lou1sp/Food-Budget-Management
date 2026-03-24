// component/market/CategoryGrid.tsx
import CategoryCard from './CategoryCard';
import { motion } from 'framer-motion';
import type { Products } from './Grocery';
export interface Category {
  id: string;
  icon: string;
  name: string;
  count: number;
}

interface CategoryGridProps {
  categories: Category[];
  activeCategoryId: string | null;
  onSelectCategory: (categoryId: string) => void;
  products: Products[];
}

export default function CategoryGrid({
  categories,
  activeCategoryId,
  onSelectCategory,
  products,
}: CategoryGridProps) {
  return (
    <div className="px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
          <p className="text-xs font-semibold tracking-wider text-white/60 uppercase">
            Browse Categories
          </p>
        </div>
        <p className="text-xs text-white/40">
          {categories.length} categories available
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-4 
  [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]"
      >
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.02 }}
          >
            <CategoryCard
              category={cat}
              isActive={activeCategoryId === cat.id}
              onSelect={onSelectCategory}
              products={products}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
