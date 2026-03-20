import { useState } from 'react';
import { useAuth } from '@/hooks/userAuth';
import PostBudgetAPI from '@/api/userData_API/postBudgetAPI';
interface Props {
  open: boolean;
  onClose: () => void;
  handleNewBudget: () => void;
  checkPoint: number;
}
export default function NewBudget({
  open,
  onClose,
  handleNewBudget,
  checkPoint,
}: Props) {
  const monthInString = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};
  const { token } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
      <div className="bg-white w-96 p-6 rounded-2xl shadow-2xl relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={() => onClose()}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Create New Budget
        </h2>

        <form 
        className="space-y-4"
        onSubmit={async (e) => {
                    e.preventDefault();
        
                    const result = await PostBudgetAPI(
                      token,
                      amount,
                      month,
                      year
                    );
        
                    if (result) {
                      setAmount(0);
                      setMonth(new Date().getMonth() + 1);
                      setYear(new Date().getFullYear());
                      handleNewBudget();
                      onClose();
                    }
                  }}>
          {/* Amount */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Amount
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          {/* Month */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Month
            </label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-500"
              required
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {Object.entries(monthInString).map(([key, name]) => (
                    <option key={key} value={Number(key)}>
                      {name}
                    </option>
                  ))}
            </select>
          </div>
          
          {/* Year */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Year</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
              required
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-semibold py-2 rounded-xl shadow-lg hover:bg-emerald-600 transition-colors"
          >
            Add New Budget
          </button>
        </form>
      </div>
    </div>
  );
}
