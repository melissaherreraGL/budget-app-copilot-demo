import { useMemo, useState } from "react";
import MonthPicker from "./components/MonthPicker";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import CategoryChart from "./components/CategoryChart";

import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Transaction } from "./types/transaction";
import { toMonthKey } from "./utils/date";

export default function App() {
  const [month, setMonth] = useState<string>(() => toMonthKey(new Date()));
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "budget.transactions",
    []
  );

  const monthTransactions = useMemo(() => {
    return transactions
      .filter((t) => t.date.slice(0, 7) === month)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [transactions, month]);

  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;

    for (const t of monthTransactions) {
      if (t.type === "income") income += t.amount;
      if (t.type === "expense") expense += t.amount;
    }

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [monthTransactions]);

  const title = useMemo(() => {
    const [y, m] = month.split("-");
    return `${m}/${y}`;
  }, [month]);

  const defaultDate = `${month}-01`;

  function addTransaction(tx: Transaction) {
    setTransactions((prev) => [tx, ...prev]);
  }

  function deleteTransaction(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  function seedDemoData() {
    const demo: Transaction[] = [
      {
        id: crypto?.randomUUID?.() ?? `demo-${Date.now()}-1`,
        type: "income",
        amount: 1500,
        category: "salary",
        date: `${month}-01`,
        note: "Salario",
      },
      {
        id: crypto?.randomUUID?.() ?? `demo-${Date.now()}-2`,
        type: "expense",
        amount: 220,
        category: "food",
        date: `${month}-03`,
        note: "Supermercado",
      },
      {
        id: crypto?.randomUUID?.() ?? `demo-${Date.now()}-3`,
        type: "expense",
        amount: 60,
        category: "transport",
        date: `${month}-05`,
        note: "Gasolina",
      },
      {
        id: crypto?.randomUUID?.() ?? `demo-${Date.now()}-4`,
        type: "expense",
        amount: 120,
        category: "utilities",
        date: `${month}-07`,
        note: "Internet",
      },
      {
        id: crypto?.randomUUID?.() ?? `demo-${Date.now()}-5`,
        type: "expense",
        amount: 180,
        category: "shopping",
        date: `${month}-10`,
        note: "Compras",
      },
      {
        id: crypto?.randomUUID?.() ?? `demo-${Date.now()}-6`,
        type: "expense",
        amount: 90,
        category: "entertainment",
        date: `${month}-12`,
        note: "Cine / streaming",
      },
    ];

    setTransactions((prev) => [...demo, ...prev]);
  }

  function clearAllData() {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar todos los datos? Esta acción no se puede deshacer."
    );
    if (confirmed) {
      setTransactions([]);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
  <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 className="text-xl font-medium tracking-tight">Budget</h1>
      <p className="text-slate-500 text-sm mt-1">
        {title} · Resumen y categorías
      </p>
    </div>

    <div className="flex items-center gap-2">
      <MonthPicker value={month} onChange={setMonth} />

      <button
        type="button"
        onClick={seedDemoData}
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 transition"
      >
        Demo
      </button>

      <button
        type="button"
        onClick={() => {
          if (confirm("¿Eliminar todos los datos?")) clearAllData();
        }}
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 transition"
      >
        Limpiar
      </button>
    </div>
  </div>
</header>


      <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <SummaryCards
          income={totals.income}
          expense={totals.expense}
          balance={totals.balance}
        />

        <TransactionForm onAdd={addTransaction} defaultDate={defaultDate} />

        <CategoryChart transactions={monthTransactions} />

        <TransactionList
          transactions={monthTransactions}
          onDelete={deleteTransaction}
        />
      </main>
    </div>
  );
}