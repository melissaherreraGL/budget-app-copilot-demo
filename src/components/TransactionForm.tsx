import { useState } from "react";
import type { Transaction } from "../types/transaction";
import type React from "react";

const CATEGORIES = {
  income: ["salary", "bonus", "other"],
  expense: ["food", "transport", "utilities", "shopping", "entertainment", "other"],
};

interface TransactionFormProps {
  onAdd: (tx: Transaction) => void;
  defaultDate: string;
}

export default function TransactionForm({ onAdd, defaultDate }: TransactionFormProps) {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState(defaultDate);
  const [note, setNote] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(amount);

    if (!Number.isFinite(n) || n <= 0) return;

    const tx: Transaction = {
      id: crypto?.randomUUID?.() ?? `tx-${Date.now()}`,
      type,
      amount: Math.round(n), // ✅ Colones: sin decimales
      category,
      date,
      note,
    };

    onAdd(tx);
    setAmount("");
    setNote("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Tipo */}
        <div>
          <label
            htmlFor="transaction-type"
            className="block text-xs font-medium text-slate-600 mb-2"
          >
            Tipo
          </label>

          <select
            id="transaction-type"
            name="transactionType"
            data-testid="transaction-type"
            value={type}
            onChange={(e) => {
              const newType = e.target.value as "income" | "expense";
              setType(newType);
              setCategory(newType === "income" ? "salary" : "food");
            }}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
          >
            <option value="income">Ingreso</option>
            <option value="expense">Gasto</option>
          </select>
        </div>

        {/* Monto */}
        <div>
          <label htmlFor="amount" className="block text-xs font-medium text-slate-600 mb-2">
            Monto (₡)
          </label>

          <input
            id="amount"
            name="amount"
            data-testid="amount"
            type="number"
            step="1" // ✅ enteros
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
          <div className="mt-1 text-xs text-slate-500">Colones (CRC). Ej: 25000</div>
        </div>

        {/* Categoría */}
        <div>
          <label
            htmlFor="category"
            className="block text-xs font-medium text-slate-600 mb-2"
          >
            Categoría
          </label>

          <select
            id="category"
            name="category"
            data-testid="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
          >
            {CATEGORIES[type].map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label htmlFor="date" className="block text-xs font-medium text-slate-600 mb-2">
            Fecha
          </label>

          <input
            id="date"
            name="date"
            data-testid="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>
      </div>

      {/* Nota */}
      <div>
        <label htmlFor="note" className="block text-xs font-medium text-slate-600 mb-2">
          Nota (opcional)
        </label>

        <input
          id="note"
          name="note"
          data-testid="note"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Descripción..."
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
        />
      </div>

      <button
    type="submit"
    data-testid="submit-transaction"
    aria-label="Agregar gasto"
    className="w-full md:w-auto rounded-lg bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800 transition"
  >
    Agregar Gasto
      </button>
    </form>
  );
}
