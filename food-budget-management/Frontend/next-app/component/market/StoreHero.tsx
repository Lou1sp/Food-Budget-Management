import type { Store  } from "./Grocery";
import { STORE_THEME } from "./GroceryDummyData";

interface StoreHeroProps {
  store: Store;
}

export default function StoreHero({ store }: StoreHeroProps) {
  const theme = STORE_THEME[store.id];

  return (
    <div className="px-8 pt-8 pb-6 border-b border-[#1a2a1b]">
      <h1 className="font-syne font-extrabold text-[28px] tracking-tight text-[#e8ede9] mb-1.5">
        {store.name}
      </h1>
      <div className="flex items-center gap-4 text-[13px] text-[#5a7060]">
        <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${theme.badge}`}>
          {store.id.toUpperCase()}
        </span>
        <span>{store.tagline}</span>
      </div>
    </div>
  );
}