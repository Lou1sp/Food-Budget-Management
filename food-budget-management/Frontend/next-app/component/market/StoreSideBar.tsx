import type { Store } from "./Grocery";
import { STORE_THEME } from "./GroceryDummyData";

interface StoreSidebarProps {
  stores: Store[];
  activeStoreId: string;
  onSelectStore: (storeId: string) => void;
}

export default function StoreSidebar({ stores, activeStoreId, onSelectStore }: StoreSidebarProps) {
  return (
    <aside className="w-[220px] bg-slate-900  py-6 flex-shrink-0 overflow-y-auto">
      <p className="text-[10px] font-medium tracking-[1.5px] text-white uppercase px-5 pb-3">
        Stores
      </p>

      {stores.map((store, idx) => {
        const theme = STORE_THEME[store.id];
        const isActive = store.id === activeStoreId;

        return (
          <div key={store.id}>
              <div className="h-px bg-gray-500 " />
     
            <button
              onClick={() => onSelectStore(store.id)}
              className={`
                w-full flex items-center gap-3 px-5 py-7 text-sm text-left
                border-l-2 transition-all duration-150 cursor-pointer
                ${isActive
                  ? 'bg-slate-500 text-[#e8ede9] border-white'
                  : 'bg-transparent text-[#8a9e8b] border-transparent  hover:text-[#c8d9c9]'
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