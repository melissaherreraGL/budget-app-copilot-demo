import type { Transaction } from "../types/transaction";

interface CategoryChartProps {
  transactions: Transaction[];
}

export default function CategoryChart({ transactions }: CategoryChartProps) {
  const categoryTotals = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      },
      {} as Record<string, number>
    );

  const sorted = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  if (sorted.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50/50 px-6 py-12 text-center">
        <p className="text-sm text-slate-500">Sin gastos este mes</p>
      </div>
    );
  }

  const total = sorted.reduce((sum, [, amount]) => sum + amount, 0);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h3 className="text-sm font-semibold text-slate-900 mb-6">
        Gastos por categoría
      </h3>
      <div className="space-y-4">
        {sorted.map(([category, amount]) => {
          const percentage = (amount / total) * 100;
          return (
            <div key={category}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                  {category}
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  ${amount.toFixed(2)}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-slate-400 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}