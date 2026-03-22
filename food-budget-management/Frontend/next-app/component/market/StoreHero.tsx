// component/market/StoreHero.tsx
import type { Store } from "./Grocery";
import { motion } from 'framer-motion';

interface StoreHeroProps {
  store: Store;
}

export default function StoreHero({ store }: StoreHeroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative px-8 pt-12 pb-8 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-slate-800"></div>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"></div>
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Featured Store</p>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold bg-white to-slate-500 bg-clip-text text-transparent mb-3">
          {store.name}
        </h1>
        
        <div className="flex items-center gap-4 text-white/60">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{store.tagline}</span>
        </div>
        
        <div className="flex gap-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
            <span className="text-xs text-white/40">Open Now</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-white/40">Free Delivery over $50</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}