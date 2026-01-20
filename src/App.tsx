import { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import MonthPicker from "./components/MonthPicker";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import CategoryChart from "./components/CategoryChart";
import { NavTabs } from "./components/NavTabs";
import { Modal } from "./components/Modal";
import { BudgetManager } from "./components/BudgetManager";

import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Transaction } from "./types/transaction";
import type { BudgetLimit } from "./types/budget";
import { toMonthKey } from "./utils/date";

// ✅ helper para calcular el mes anterior a partir de "YYYY-MM"
function prevMonthKey(monthKey: string) {
  const [yStr, mStr] = monthKey.split("-");
  const y = Number(yStr);
  const m = Number(mStr); // 1..12

  if (m === 1) return `${y - 1}-12`;
  return `${y}-${String(m - 1).padStart(2, "0")}`;
}

// ✅ "Nombres bonitos" para el demo
const CATEGORY_LABELS: Record<string, string> = {
  salary: "Salario",
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

function formatMoney(n: number) {
  return `$${n.toFixed(2)}`;
}

function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-2">
      <h2 className="text-lg font-medium tracking-tight">{title}</h2>
      {subtitle ? (
        <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
      ) : null}
    </div>
  );
}

function AlertCard({
  items,
}: {
  items: { kind: "danger" | "warn" | "ok"; title: string; detail: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
      <div className="text-sm font-medium">Alertas de presupuesto</div>
      <div className="mt-1 text-xs text-slate-500">
        Basado en tus límites por categoría (mes actual)
      </div>

      <div className="mt-4 space-y-2">
        {items.map((a, idx) => {
          const icon = a.kind === "danger" ? "🚨" : a.kind === "warn" ? "⚠️" : "✅";
          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 px-3 py-2"
            >
              <div className="text-sm font-medium text-slate-900">
                {icon} {a.title}
              </div>
              <div className="text-xs text-slate-500 mt-1">{a.detail}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [month, setMonth] = useState<string>(() => toMonthKey(new Date()));
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "budget.transactions",
    []
  );

  // ✅ Etapa 3: presupuestos en localStorage
  const [budgetLimits, setBudgetLimits] = useLocalStorage<BudgetLimit[]>(
    "budget.limits",
    []
  );

  // ✅ modal para "Agregar" desde cualquier tab
  const [addOpen, setAddOpen] = useState(false);

  // Mes actual: transacciones filtradas
  const monthTransactions = useMemo(() => {
    return transactions
      .filter((t) => t.date.slice(0, 7) === month)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [transactions, month]);

  // Mes actual: totales
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

  // Mes anterior (YYYY-MM)
  const prevMonth = useMemo(() => prevMonthKey(month), [month]);

  // Transacciones del mes anterior
  const prevMonthTransactions = useMemo(() => {
    return transactions.filter((t) => t.date.slice(0, 7) === prevMonth);
  }, [transactions, prevMonth]);

  // Totales del mes anterior
  const prevTotals = useMemo(() => {
    let income = 0;
    let expense = 0;

    for (const t of prevMonthTransactions) {
      if (t.type === "income") income += t.amount;
      if (t.type === "expense") expense += t.amount;
    }

    return { income, expense };
  }, [prevMonthTransactions]);

  const headerTitle = useMemo(() => {
    const [y, m] = month.split("-");
    return `${m}/${y}`;
  }, [month]);

  const defaultDate = `${month}-01`;

  function addTransaction(tx: Transaction) {
    setTransactions((prev) => [tx, ...prev]);
    setAddOpen(false);
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
      setBudgetLimits([]);
    }
  }

  // ✅ Insight “aha” — Top 3 categorías + comparación vs mes anterior (con nombres bonitos)
  const topCategoriesInsight = useMemo(() => {
    const curr = new Map<string, number>();
    const prev = new Map<string, number>();

    for (const t of monthTransactions) {
      if (t.type !== "expense") continue;
      curr.set(t.category, (curr.get(t.category) ?? 0) + t.amount);
    }

    for (const t of prevMonthTransactions) {
      if (t.type !== "expense") continue;
      prev.set(t.category, (prev.get(t.category) ?? 0) + t.amount);
    }

    const rows = Array.from(curr.entries())
      .map(([category, amount]) => {
        const prevAmount = prev.get(category) ?? 0;
        const delta = amount - prevAmount;

        return {
          category,
          categoryLabel: prettyCategory(category),
          amount,
          prevAmount,
          delta,
        };
      })
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    const hasAny = rows.length > 0;

    return {
      hasAny,
      rows,
      title: "Insight",
      subtitle: hasAny
        ? "Tus 3 categorías con más gasto este mes"
        : "Aún no hay gastos este mes",
      hint: hasAny
        ? `Comparación contra ${prevMonth}`
        : "Tip: usa “+ Agregar” para registrar un gasto rápido.",
    };
  }, [monthTransactions, prevMonthTransactions, prevMonth]);

  // ✅ Etapa 3: filtra presupuestos del mes actual
  const monthBudgets = useMemo(() => {
    return budgetLimits.filter((b) => b.month === month);
  }, [budgetLimits, month]);

  function upsertBudget(entry: BudgetLimit) {
    setBudgetLimits((prev) => {
      const filtered = prev.filter(
        (b) => !(b.month === entry.month && b.category === entry.category)
      );
      return [entry, ...filtered];
    });
  }

  function deleteBudget(monthKey: string, category: string) {
    setBudgetLimits((prev) =>
      prev.filter((b) => !(b.month === monthKey && b.category === category))
    );
  }

  // ✅ Etapa 3.5: alertas automáticas en Dashboard (basadas en presupuesto)
  const budgetAlerts = useMemo(() => {
    // gastos por categoría (solo expenses)
    const spent = new Map<string, number>();
    for (const t of monthTransactions) {
      if (t.type !== "expense") continue;
      spent.set(t.category, (spent.get(t.category) ?? 0) + t.amount);
    }

    const alerts: { kind: "danger" | "warn" | "ok"; title: string; detail: string }[] = [];

    // Solo alertamos categorías que tengan presupuesto > 0
    for (const b of monthBudgets) {
      if (!Number.isFinite(b.limit) || b.limit <= 0) continue;

      const s = spent.get(b.category) ?? 0;
      const ratio = s / b.limit;
      const remaining = b.limit - s;

      if (ratio >= 1) {
        alerts.push({
          kind: "danger",
          title: `Excediste ${prettyCategory(b.category)}`,
          detail: `Gastaste ${formatMoney(s)} de ${formatMoney(b.limit)} (restante ${formatMoney(remaining)}).`,
        });
      } else if (ratio >= 0.8) {
        alerts.push({
          kind: "warn",
          title: `Cerca del límite en ${prettyCategory(b.category)}`,
          detail: `Vas en ${(ratio * 100).toFixed(0)}% — te quedan ${formatMoney(remaining)}.`,
        });
      } else if (ratio <= 0.5 && s > 0) {
        // “Ok” solo si hay algo de gasto (si no, se siente raro)
        alerts.push({
          kind: "ok",
          title: `Vas bien en ${prettyCategory(b.category)}`,
          detail: `Solo usaste ${(ratio * 100).toFixed(0)}% — te quedan ${formatMoney(remaining)}.`,
        });
      }
    }

    // Orden: danger, warn, ok. Luego por mayor % usado
    const kindOrder = { danger: 0, warn: 1, ok: 2 } as const;
    alerts.sort((a, b) => kindOrder[a.kind] - kindOrder[b.kind]);

    // Limitar para que se vea limpio
    return alerts.slice(0, 4);
  }, [monthTransactions, monthBudgets]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-medium tracking-tight">Budget</h1>
            <p className="text-slate-500 text-sm mt-1">
              {headerTitle} · Resumen y categorías
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
              onClick={clearAllData}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 transition"
            >
              Limpiar
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-4">
          <NavTabs />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 relative">
        {/* CTA persistente */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="rounded-2xl shadow-lg border border-slate-200 bg-slate-900 text-white px-4 py-3 text-sm font-medium hover:bg-slate-800 transition"
          >
            + Agregar
          </button>
        </div>

        {/* Modal para agregar transacción */}
        <Modal
          open={addOpen}
          title="Agregar transacción"
          onClose={() => setAddOpen(false)}
        >
          <TransactionForm onAdd={addTransaction} defaultDate={defaultDate} />
        </Modal>

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/dashboard"
            element={
              <div className="space-y-10">
                <PageTitle title="Dashboard" subtitle="Resumen del mes y categorías" />

                {/* ✅ Etapa 3.5: alertas */}
                <AlertCard items={budgetAlerts} />

                {/* Insight Top 3 */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                  <div className="text-sm font-medium">{topCategoriesInsight.title}</div>
                  <div className="mt-1 text-xs text-slate-500">{topCategoriesInsight.subtitle}</div>

                  {topCategoriesInsight.hasAny ? (
                    <div className="mt-4 space-y-2">
                      {topCategoriesInsight.rows.map((r, idx) => {
                        const arrow =
                          r.prevAmount === 0 ? "•" : r.delta > 0 ? "▲" : r.delta < 0 ? "▼" : "•";

                        const deltaText =
                          r.prevAmount === 0
                            ? `Sin historial en ${prevMonth}`
                            : r.delta === 0
                            ? `Igual que ${prevMonth}`
                            : `${formatMoney(Math.abs(r.delta))} ${
                                r.delta > 0 ? "más" : "menos"
                              } que ${prevMonth}`;

                        return (
                          <div
                            key={r.category}
                            className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-3 py-2"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-6 text-center text-sm font-semibold text-slate-700">
                                {idx + 1}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-slate-900">
                                  {r.categoryLabel}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {arrow} {deltaText}
                                </div>
                              </div>
                            </div>

                            <div className="text-sm font-semibold text-slate-900">
                              {formatMoney(r.amount)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-3 text-sm text-slate-600">
                      Agrega un gasto para ver tu ranking de categorías.
                    </div>
                  )}

                  <div className="mt-3 text-xs text-slate-500">{topCategoriesInsight.hint}</div>
                </div>

                <SummaryCards
                  income={totals.income}
                  expense={totals.expense}
                  balance={totals.balance}
                  prevIncome={prevTotals.income}
                  prevExpense={prevTotals.expense}
                />

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                  <CategoryChart transactions={monthTransactions} />
                </div>
              </div>
            }
          />

          <Route
            path="/gastos"
            element={
              <div className="space-y-10">
                <PageTitle title="Gastos" subtitle="Agrega y administra tus transacciones" />

                {/* Mantengo el form aquí también */}
                <TransactionForm onAdd={addTransaction} defaultDate={defaultDate} />

                <TransactionList
                  transactions={monthTransactions}
                  onDelete={deleteTransaction}
                />
              </div>
            }
          />

          <Route
            path="/presupuesto"
            element={
              <div className="space-y-6">
                <PageTitle title="Presupuesto" subtitle="Límites por categoría y progreso" />

                <BudgetManager
                  month={month}
                  monthTransactions={monthTransactions}
                  budgets={monthBudgets}
                  onUpsertBudget={upsertBudget}
                  onDeleteBudget={deleteBudget}
                />
              </div>
            }
          />

          <Route
            path="/metas"
            element={
              <div className="space-y-4">
                <PageTitle title="Metas" subtitle="Próxima etapa: meta de ahorro mensual" />
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 text-slate-600">
                  En la siguiente etapa vamos a agregar una meta mensual (ej: ahorrar $200) y mostrar
                  el progreso basado en (ingresos - gastos).
                </div>
              </div>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}
