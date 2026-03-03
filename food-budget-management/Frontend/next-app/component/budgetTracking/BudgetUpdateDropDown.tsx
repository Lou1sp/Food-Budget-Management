import { useState } from "react";
import { useAuth } from "@/hooks/userAuth";
import GetBudgetAPI from "@/api/getBudgetAPI";
import PutBudgetAPI from "@/api/putBudetAPI";
interface Props{
    chosenMonth: number,
    chosenYear: number,
    handleNewCategory: () => void;
    checkPoint: number
}
export default function BudgetDropDown({checkPoint, handleNewCategory, chosenMonth, chosenYear}: Props) {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const budget = GetBudgetAPI(chosenMonth, chosenYear, checkPoint);
  return (
    <div className="relative z-10">
      <button
        onClick={() => setOpen(!open)}
        className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-emerald-100 text-xs font-medium hover:bg-white/30 transition-colors"
      >
        Edit Budget ▼
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden">
          <div className="">
            <div>
            <label className="block text-gray-700 font-medium px-4 pt-3">
              Current Budget: {budget}
            </label>
            <div className="p-3 border-b border-slate-200 flex gap-2">
            <input
              type="number"
              className="flex-1 px-3 py-2 rounded border border-gray-300 w-20 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm text-black"
              step="0.01"
              required
              placeholder="New Budget"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button
              onClick={async (e) => {
                          e.preventDefault();
                          const result = await PutBudgetAPI(token, amount, chosenMonth, chosenYear)
                          console.log(result);
                          if(result) {
                            setAmount(0);
                            handleNewCategory();
                            console.log(checkPoint +  "SupaNika")
                          }
                        }}
              className="bg-emerald-500 text-white px-3 py-1 rounded text-sm hover:bg-emerald-600 transition-colors"
            >
              Update
            </button>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}