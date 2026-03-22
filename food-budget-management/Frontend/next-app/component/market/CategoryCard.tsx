// component/market/CategoryCard.tsx
import { motion } from 'framer-motion';
import type { Products } from "./Grocery"
interface Category {
  id: string;
  icon: string;
  name: string;
  count: number;
}

interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  onSelect: (categoryId: string) => void;
  products: Products[];
}

export default function CategoryCard({ category, isActive, onSelect, products }: CategoryCardProps) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(category.id)}
      className={`
        group relative rounded-2xl p-5 cursor-pointer transition-all duration-300 w-35 h-40
        ${isActive
          ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-2 border-amber-400/50 shadow-lg shadow-amber-500/20'
          : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-400/30'
        }
      `}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div className={`
          w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300
          ${isActive 
            ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg' 
            : 'bg-white/10 group-hover:bg-white/20'
          }
        `}>
          {category.icon}
        </div>
        
        <div>
          <p className={`text-sm font-semibold ${isActive ? 'text-amber-400' : 'text-white/80'}`}>
            {category.name}
          </p>
        </div>
      </div>
      
      {isActive && (
        <div className="absolute -top-px left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
      )}
    </motion.button>
  );
}