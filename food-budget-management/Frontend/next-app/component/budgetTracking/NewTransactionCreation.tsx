import { GetAllCategoriesAPI } from '@/api/getCategoryAPI';
import { useState } from 'react';
import { useAuth } from '@/hooks/userAuth';
import PostTransactionAPI from '@/api/postNewTransactionAPI';
interface Props {
  open: boolean;
  onClose: () => void;
  handleNewTransaction: () => void;
  checkPoint: number;
}
export default function NewTransaction({
  open,
  onClose,
  handleNewTransaction,
  checkPoint,
}: Props) {
  const { token } = useAuth();
  const categories = GetAllCategoriesAPI(checkPoint);
  const [category, setCategory] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [note, setNote] = useState<string>('');
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
          Add Transaction
        </h2>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();

            const result = await PostTransactionAPI(
              token,
              category,
              amount,
              date,
              note,
            );

            if (result) {
              setCategory(0);
              setAmount(0);
              setDate('');
              setNote('');
              handleNewTransaction();
              onClose();
            }
          }}
        >
          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-500"
              required
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
            >
              <option value="">-- Select Category --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

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

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-500"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Note</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-semibold py-2 rounded-xl shadow-lg hover:bg-emerald-600 transition-colors"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}
