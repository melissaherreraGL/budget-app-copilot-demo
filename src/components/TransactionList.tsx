import type { Transaction } from "../types/transaction";
import { formatCRC } from "../utils/money";

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

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit?: (transaction: Transaction) => void; // ✅ opcional (evita crash)
}

export default function TransactionList({
  transactions,
  onDelete,
  onEdit,
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
    <div className="space-y-2" data-testid="transactions-list">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          data-testid="transaction-row"
          data-transaction-id={tx.id}
          data-amount={String(tx.amount)}
          data-category={tx.category}
          data-type={tx.type}
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                {prettyCategory(tx.category)}
              </div>
              <p className="text-sm text-slate-600">{tx.note || "Sin nota"}</p>
            </div>
            <p className="text-xs text-slate-400 mt-1">{tx.date}</p>
          </div>

          <div className="flex items-center gap-3 ml-4">
            <span
              className={`text-sm font-semibold whitespace-nowrap ${
                tx.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              {tx.type === "income" ? "+" : "-"}
              {formatCRC(tx.amount)}
            </span>

            {/* EDITAR */}
            <button
              type="button"
              data-testid="edit-transaction"
              aria-label={`Editar transacción: ${tx.note || tx.category}`}
              onClick={() => onEdit?.(tx)}
              className={`text-xs transition ${
                onEdit
                  ? "text-slate-400 hover:text-blue-600"
                  : "text-slate-300 cursor-not-allowed"
              }`}
              title={onEdit ? "Editar" : "Editar no disponible"}
              disabled={!onEdit}
            >
              ✏️
            </button>

            {/* ELIMINAR */}
            <button
              type="button"
              data-testid="delete-transaction"
              aria-label={`Eliminar transacción: ${tx.note || tx.category}`}
              onClick={() => onDelete(tx.id)}
              className="text-xs text-slate-400 hover:text-red-600 transition"
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
