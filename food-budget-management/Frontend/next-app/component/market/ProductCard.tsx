import type { Products } from "./Grocery";
import Image from "next/image";
interface ProductCardProps {
  product: Products;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-[#111611] border border-[#1a2a1b] rounded-[10px] overflow-hidden transition-all duration-150 hover:border-[#2e4430] hover:bg-[#131a14]">
      {/* Image / emoji placeholder */}
      <div className="h-[200px] bg-[#181f19] border-b border-[#1a2a1b] flex items-center justify-center text-4xl select-none">
        <img src={product.image} alt="" width={210} height={200}></img>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-[13px] font-medium text-[#c8d9c9] leading-snug mb-1.5 truncate">
          {product.title}
        </p>
        <p className="font-syne font-bold text-base text-[#7ec98a]">
          {product.price} CAD$
        </p>
        <p className="text-[11px] text-[#4a5c4b] mt-0.5">
          {product.brand}
        </p>
        
      </div>
    </div>
  );
}