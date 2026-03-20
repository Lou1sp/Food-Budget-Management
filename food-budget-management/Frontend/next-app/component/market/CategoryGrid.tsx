import CategoryCard from './CategoryCard';

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
}

export default function CategoryGrid({ categories, activeCategoryId, onSelectCategory }: CategoryGridProps) {
  return (
    <div>
      <p className="text-[11px] tracking-[1.2px] uppercase text-[#4a5c4b] font-medium px-8 pt-6 pb-3.5">
        Categories
      </p>
      <div className="grid grid-cols-10 gap-10 px-8 pb-6">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            isActive={activeCategoryId === cat.id}
            onSelect={onSelectCategory}
          />
        ))}
      </div>
    </div>
  );
}