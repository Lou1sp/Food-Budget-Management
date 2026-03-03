import GetTransactionAPI from "@/api/getTransactionAPI";
interface Props {
  chosenMonth: number;
  chosenYear: number;
  checkPoint: number;
}

interface Transaction {
  id: number;
  amount: number;
  spent_at: Date;
  note?: string;
  category: {
    name: string;
  };
}

export default function MonthlyExpenseList({
  chosenMonth,
  chosenYear,
  checkPoint,
}: Props) {
  const expenses: Transaction[]  = GetTransactionAPI(
    chosenMonth,
    chosenYear,
    checkPoint
  );


  return (
    <div className="relative overflow-scroll max-h-[700px]">
      <h2 className="h-22 mb-5 mt-0.5 bg-gradient-to-r from-emerald-600 to-emerald-500 p-4 flex justify-between items-center rounded-t-2xl font-bold sticky top-0 z-10">
        Monthly Expenses
      </h2>

      <div className="space-y-3">
        {expenses.length === 0 && (
          <div className="text-gray-400 text-sm">
            No expenses for this month.
          </div>
        )}

        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="border border-gray-200 p-3 bg-gray-50 hover:bg-gray-100 transition"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-800">
                {new Date(expense.spent_at).toLocaleDateString()}
              </span>
              <span className="text-sm font-semibold text-emerald-600">
                - {expense.amount.toLocaleString()} CAD
              </span>
            </div>

            <div className="text-xs text-gray-500 mt-1">
              Category: {expense.category?.name || "Uncategorized"}
            </div>

            {expense.note && (
              <div className="text-sm text-gray-700 mt-2">
                {expense.note}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}