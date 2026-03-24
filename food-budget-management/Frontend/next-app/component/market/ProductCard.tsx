// component/market/ProductCard.tsx
import type { Products } from "./Grocery";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProductCardProps {
  product: Products;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-all duration-50"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Quick view button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-amber-500 text-white text-xs font-semibold rounded-full shadow-lg"
        >
          Quick View
        </motion.button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <p className="text-sm font-semibold text-white/90 line-clamp-2 flex-1 truncate">
            {product.title}
          </p>
        </div>
        
        <p className="text-xs text-white/40 mb-3">{product.brand ?? "No Brand"}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-300 bg-clip-text text-transparent">
              ${product.price}
            </p>
            <p className="text-xs text-white/40 ">CAD</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}