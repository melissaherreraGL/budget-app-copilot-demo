import type { Transaction } from "../types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({
  transactions,
  onDelete,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50/50 px-6 py-12 text-center">
        <p className="text-sm text-slate-500">
          No hay transacciones para este mes
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                {tx.category}
              </div>
              <p className="text-sm text-slate-600">{tx.note || "Sin nota"}</p>
            </div>
            <p className="text-xs text-slate-400 mt-1">{tx.date}</p>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <span
              className={`text-sm font-semibold ${
                tx.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
            </span>

            <button
              onClick={() => onDelete(tx.id)}
              className="text-xs text-slate-400 hover:text-slate-600 transition"
              title="Eliminar"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}