import { useState } from "react";
import { GetAllCategoriesAPI } from "@/api/getCategoryAPI";
import PostCategoryAPI from "@/api/postNewCategoryAPI";
import DeleteCategoryAPI from "@/api/deleteCategoryAPI";
import { useAuth } from "@/hooks/userAuth";
interface Props{
    handleNewCategory: () => void;
    checkPoint: number
}
export default function CategoriesDropDown({checkPoint, handleNewCategory}: Props) {
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const categories = GetAllCategoriesAPI(checkPoint);
  const { token } = useAuth();
  return (
    <div className="relative z-10">
      <button
        onClick={() => setOpen(!open)}
        className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-emerald-100 text-xs font-medium hover:bg-white/30 transition-colors"
      >
        Edit Categories ▼
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden">
          <div className="p-3 border-b border-slate-200 flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category"
              className="flex-1 px-3 py-1 rounded border border-gray-300 w-20 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm text-black"
            />
            <button
              onClick={async (e) => {
                          e.preventDefault();
              
                          const result = await PostCategoryAPI(token, newCategory)
                          console.log(result + "Hello Siuuuuuu");
                          if (result) {
                            setNewCategory("");
                            handleNewCategory();
                          }
                        }}
              className="bg-emerald-500 text-white px-3 py-1 rounded text-sm hover:bg-emerald-600 transition-colors"
            >
              Add
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {categories.length === 0 ? (
              <p className="p-3 text-sm text-gray-500">No categories</p>
            ) : (
              categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 transition-colors cursor-default"
                >
                  <span className="text-sm text-slate-700">{cat.name}</span>
                  <button
                    onClick={async (e) => {
                          e.preventDefault();
              
                          const result = await DeleteCategoryAPI(token, cat.id)
              
                          if (result) {
                            handleNewCategory();
                          }
                        }}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    X
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}