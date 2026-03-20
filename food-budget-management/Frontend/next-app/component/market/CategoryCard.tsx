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
}

export default function CategoryCard({ category, isActive, onSelect }: CategoryCardProps) {
  return (
    <button
      onClick={() => onSelect(category.id)}
      className={`
        group relative text-left rounded-xl p-[18px] cursor-pointer
        border transition-all duration-150 overflow-hidden
        ${isActive
          ? 'bg-[#162019] border-[#3a5e3f]'
          : 'bg-[#131a14] border-[#1e2b1f] hover:bg-[#172019] hover:border-[#2e4430] hover:-translate-y-px'
        }
      `}
    >
      {/* Top accent line */}
      <span
        className={`
          absolute top-0 left-0 right-0 h-[2px] transition-all duration-150
          ${isActive ? 'bg-[#7ec98a]' : 'bg-transparent group-hover:bg-[#7ec98a]'}
        `}
      />

      <div className="flex flex-col gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-[#1d2e1f] flex items-center justify-center text-lg leading-none">
          {category.icon}
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#c8d9c9] leading-snug">
            {category.name}
          </p>
          <p className="text-[11px] text-[#4a5c4b] mt-0.5">
            {category.count} items
          </p>
        </div>
      </div>
    </button>
  );
}