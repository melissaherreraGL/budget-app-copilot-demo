import type { Transaction } from "../types/transaction";
import { formatCRC } from "../utils/money";

interface CategoryChartProps {
  transactions: Transaction[];
}

const CATEGORY_LABELS: Record<string, string> = {
  salary: "Salario",
  bonus: "Bono",
  food: "Comida",
  transport: "Transporte",
  utilities: "Servicios",
  shopping: "Compras",
  entertainment: "Entretenimiento",
  health: "Salud",
  education: "Educación",
  housing: "Vivienda",
  savings: "Ahorro",
  other: "Otros",
};

function prettyCategory(key: string) {
  return CATEGORY_LABELS[key] ?? key;
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
          const percentage = total > 0 ? (amount / total) * 100 : 0;

          return (
            <div key={category}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                  {prettyCategory(category)}
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {formatCRC(amount)}
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

      <p className="mt-4 text-xs text-slate-500">
        Top 5 categorías (solo gastos). Total mostrado:{" "}
        <span className="font-medium">{formatCRC(total)}</span>
      </p>
    </div>
  );
}
