import { useState } from "react";
import type { Transaction } from "../types/transaction";

const CATEGORIES = {
  income: ["salary", "bonus", "other"],
  expense: ["food", "transport", "utilities", "shopping", "entertainment", "other"],
};

interface TransactionFormProps {
  onAdd: (tx: Transaction) => void;
  defaultDate: string;
}

export default function TransactionForm({
  onAdd,
  defaultDate,
}: TransactionFormProps) {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState(defaultDate);
  const [note, setNote] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    const tx: Transaction = {
      id: crypto?.randomUUID?.() ?? `tx-${Date.now()}`,
      type,
      amount: parseFloat(amount),
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
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">
            Tipo
          </label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as "income" | "expense");
              setCategory(
                e.target.value === "income" ? "salary" : "food"
              );
            }}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
          >
            <option value="income">Ingreso</option>
            <option value="expense">Gasto</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">
            Monto
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">
            Categoría
          </label>
          <select
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

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">
            Fecha
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-2">
          Nota (opcional)
        </label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Descripción..."
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto rounded-lg bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800 transition"
      >
        Agregar
      </button>
    </form>
  );
}