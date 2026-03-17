import type { Store } from "./Grocery";
import { STORE_THEME } from "./GroceryDummyData";

interface StoreSidebarProps {
  stores: Store[];
  activeStoreId: string;
  onSelectStore: (storeId: string) => void;
}

export default function StoreSidebar({ stores, activeStoreId, onSelectStore }: StoreSidebarProps) {
  return (
    <aside className="w-[220px] bg-[#111611] border-r border-[#1e2b1f] py-6 flex-shrink-0 overflow-y-auto">
      <p className="text-[10px] font-medium tracking-[1.5px] text-[#4a5c4b] uppercase px-5 pb-3">
        Stores
      </p>

      {stores.map((store, idx) => {
        const theme = STORE_THEME[store.id];
        const isActive = store.id === activeStoreId;

        // Divider before Costco (index 2) to separate discount vs premium
        const showDivider = idx === 2;

        return (
          <div key={store.id}>
            {showDivider && (
              <div className="h-px bg-[#1a2a1b] mx-0 my-3" />
            )}
            <button
              onClick={() => onSelectStore(store.id)}
              className={`
                w-full flex items-center gap-3 px-5 py-3 text-sm text-left
                border-l-2 transition-all duration-150 cursor-pointer
                ${isActive
                  ? 'bg-[#162019] text-[#e8ede9] border-[#7ec98a]'
                  : 'bg-transparent text-[#8a9e8b] border-transparent hover:bg-[#161f17] hover:text-[#c8d9c9]'
                }
              `}
            >
              <span
                className={`
                  w-7 h-7 rounded-[7px] flex items-center justify-center
                  text-[13px] font-bold font-syne flex-shrink-0
                  ${theme.dot}
                `}
              >
                {store.initial}
              </span>
              {store.name}
            </button>
          </div>
        );
      })}
    </aside>
  );
}