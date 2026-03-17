import type { Product } from "./Grocery";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-[#111611] border border-[#1a2a1b] rounded-[10px] overflow-hidden transition-all duration-150 hover:border-[#2e4430] hover:bg-[#131a14]">
      {/* Image / emoji placeholder */}
      <div className="h-[120px] bg-[#181f19] border-b border-[#1a2a1b] flex items-center justify-center text-4xl select-none">
        {product.emoji}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-[13px] font-medium text-[#c8d9c9] leading-snug mb-1.5">
          {product.name}
        </p>
        <p className="font-syne font-bold text-base text-[#7ec98a]">
          {product.price}
        </p>
        <p className="text-[11px] text-[#4a5c4b] mt-0.5">
          {product.unit}
        </p>
        {product.tag && (
          <span className="inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#1a2e1d] text-[#5a9e68]">
            {product.tag}
          </span>
        )}
      </div>
    </div>
  );
}