import { useState, useEffect } from "react";
import type { Transaction } from "../types/transaction";
import type { Category } from "../types/transaction";

const CATEGORIES = {
  income: ["salary", "bonus", "other"],
  expense: ["food", "transport", "utilities", "shopping", "entertainment", "health", "education", "housing", "savings", "other"],
} as const;

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

interface TransactionFormProps {
  onAdd: (tx: Transaction) => void;
  defaultDate: string;
  mode?: "create" | "edit";
  initialValue?: Transaction;
  onClose?: () => void;
}

export default function TransactionForm({
  onAdd,
  defaultDate,
  mode = "create",
  initialValue,
  onClose,
}: TransactionFormProps) {
  const [type, setType] = useState<"income" | "expense">(
    initialValue?.type ?? "expense"
  );
  const [amount, setAmount] = useState(initialValue?.amount?.toString() ?? "");
  const [category, setCategory] = useState<Category>(
    initialValue?.category ?? "food"
  );
  const [date, setDate] = useState(initialValue?.date ?? defaultDate);
  const [note, setNote] = useState(initialValue?.note ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

 useEffect(() => {
  if (mode === "edit" && initialValue) {
      setType(initialValue.type);
      setAmount(initialValue.amount.toString());
      setCategory(initialValue.category as Category);
      setDate(initialValue.date);
      setNote(initialValue.note ?? "");
    }
}, [mode, initialValue]);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    const n = Number(amount);
    if (!Number.isFinite(n) || n <= 0) {
      newErrors.amount = "El monto debe ser mayor a 0";
    }

    if (!date) {
      newErrors.date = "La fecha es requerida";
    }

    if (!category) {
      newErrors.category = "Selecciona una categoría";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    
    if (!validate()) return;

    const n = Number(amount);

    const tx: Transaction = {
      id: initialValue?.id ?? crypto?.randomUUID?.() ?? `tx-${Date.now()}`,
      type,
      amount: Math.round(n),
      category,
      date,
      note,
    };

    onAdd(tx);
    
    // Resetear formulario solo si es modo "create"
    if (mode === "create") {
      setAmount("");
      setNote("");
    }

    // Cerrar modal si está en modo edit
    if (mode === "edit" && onClose) {
      onClose();
    }
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
              setCategory((newType === "income" ? "salary" : "food") as Category);
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
            step="1"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className={`w-full rounded-lg border ${
              errors.amount ? "border-red-300" : "border-slate-300"
            } bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
              errors.amount ? "focus:ring-red-400" : "focus:ring-slate-400"
            }`}
          />
          {errors.amount && (
            <p className="mt-1 text-xs text-red-600">{errors.amount}</p>
          )}
          {!errors.amount && (
            <div className="mt-1 text-xs text-slate-500">Colones (CRC). Ej: 25000</div>
          )}
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="category" className="block text-xs font-medium text-slate-600 mb-2">
            Categoría
          </label>

          <select
            id="category"
            name="category"
            data-testid="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className={`w-full rounded-lg border ${
              errors.category ? "border-red-300" : "border-slate-300"
            } bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 ${
              errors.category ? "focus:ring-red-400" : "focus:ring-slate-400"
            }`}
          >
            {CATEGORIES[type].map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-xs text-red-600">{errors.category}</p>
          )}
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
            className={`w-full rounded-lg border ${
              errors.date ? "border-red-300" : "border-slate-300"
            } bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 ${
              errors.date ? "focus:ring-red-400" : "focus:ring-slate-400"
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-xs text-red-600">{errors.date}</p>
          )}
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

      <div className="flex gap-2 justify-end" data-testid="form-actions">
        {mode === "edit" && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          data-testid="submit-transaction"
          aria-label={mode === "edit" ? "Guardar cambios" : "Agregar transacción"}
          className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800 transition"
        >
          {mode === "edit"
            ? "Guardar Cambios"
            : type === "income"
              ? "Agregar Ingreso"
              : "Agregar Gasto"}
        </button>
      </div>
    </form>
  );
}