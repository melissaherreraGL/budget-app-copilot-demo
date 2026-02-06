import { useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import MonthPicker from "./components/MonthPicker";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import CategoryChart from "./components/CategoryChart";
import { NavTabs } from "./components/NavTabs";
import { Modal } from "./components/Modal";
import { BudgetManager } from "./components/BudgetManager";
import { GoalsManager } from "./components/GoalsManager";

import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Transaction } from "./types/transaction";
import type { BudgetLimit } from "./types/budget";
import type { Goal } from "./types/goal";
import { toMonthKey } from "./utils/date";
import { formatCRC } from "./utils/money";

function prevMonthKey(monthKey: string) {
  const [yStr, mStr] = monthKey.split("-");
  const y = Number(yStr);
  const m = Number(mStr);
  if (m === 1) return `${y - 1}-12`;
  return `${y}-${String(m - 1).padStart(2, "0")}`;
}

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

function clamp01(x: number) {
  if (x < 0) return 0;
  if (x > 1) return 1;
  return x;
}

function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-2">
      <h2 className="text-lg font-medium tracking-tight">{title}</h2>
      {subtitle ? <p className="text-slate-500 text-sm mt-1">{subtitle}</p> : null}
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
    <div data-testid="budget-alerts-card" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
      <div data-testid="budget-alerts-title" className="text-sm font-medium">Alertas de presupuesto</div>
      <div data-testid="budget-alerts-subtitle" className="mt-1 text-xs text-slate-500">
        Basado en tus límites por categoría (mes actual)
      </div>

      <div data-testid="budget-alerts-list" className="mt-4 space-y-2">
        {items.map((a, idx) => {
          const icon = a.kind === "danger" ? "🚨" : a.kind === "warn" ? "⚠️" : "✅";
          return (
            <div key={idx} data-testid="budget-alert-item" data-kind={a.kind} className="rounded-xl border border-slate-200 px-3 py-2">
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

function GoalsMiniCard({ month, balance, goals }: { month: string; balance: number; goals: Goal[] }) {
  const navigate = useNavigate();

  const goal = useMemo(() => {
    return goals.find((g) => g.month === month && g.type === "savings") ?? null;
  }, [goals, month]);

  const target = goal?.target ?? 0;

  const ratio = useMemo(() => {
    if (!goal || target <= 0) return 0;
    return balance / target;
  }, [goal, balance, target]);

  const pct = Math.round(clamp01(ratio) * 100);

  const status = useMemo(() => {
    if (!goal || target <= 0) return "none";
    if (balance >= target) return "done";
    if (balance >= target * 0.8) return "near";
    return "progress";
  }, [goal, target, balance]);

  const icon =
    status === "done" ? "✅" : status === "near" ? "⚠️" : status === "progress" ? "🎯" : "•";

  const title =
    status === "done"
      ? "Meta lograda"
      : status === "near"
      ? "Cerca de tu meta"
      : status === "progress"
      ? "Meta en progreso"
      : "Define una meta";

  const detail =
    status === "none"
      ? "Configura tu meta de ahorro para ver el progreso aquí."
      : `Balance: ${formatCRC(balance)} · Meta: ${formatCRC(target)} · ${pct}%`;

  return (
    <div
      data-testid="goal-progress-card"
      data-status={status}
      data-month={month}
      data-pct={String(pct)}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div data-testid="goal-progress-title" className="text-sm font-medium">
            {icon} Progreso de meta
          </div>
          <div data-testid="goal-progress-subtitle" className="mt-1 text-xs text-slate-500">
            {title}
          </div>
        </div>

        <button
          type="button"
          data-testid="go-to-goals"
          aria-label="Ir a Metas"
          onClick={() => navigate("/metas")}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 transition"
        >
          Ver Metas
        </button>
      </div>

      <div data-testid="goal-progress-detail" className="mt-3 text-sm text-slate-800">
        {detail}
      </div>

      <div className="mt-3">
        <div
          data-testid="goal-progress-bar"
          role="progressbar"
          aria-label="Progreso de meta"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          className="h-2 w-full rounded-full bg-slate-100 border border-slate-200 overflow-hidden"
        >
          <div
            data-testid="goal-progress-bar-fill"
            className="h-2 bg-slate-900"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div data-testid="goal-progress-percent" className="mt-1 text-xs text-slate-500">
          {pct}%
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [month, setMonth] = useState<string>(() => toMonthKey(new Date()));
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>("budget.transactions", []);

  const [budgetLimits, setBudgetLimits] = useLocalStorage<BudgetLimit[]>("budget.limits", []);
  const [goals, setGoals] = useLocalStorage<Goal[]>("budget.goals", []);

  const [addOpen, setAddOpen] = useState(false);

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

    return { income, expense, balance: income - expense };
  }, [monthTransactions]);

  const prevMonth = useMemo(() => prevMonthKey(month), [month]);

  const prevMonthTransactions = useMemo(() => {
    return transactions.filter((t) => t.date.slice(0, 7) === prevMonth);
  }, [transactions, prevMonth]);

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
        amount: 1500000,
        category: "salary",
        date: `${month}-01`,
        note: "Salario",
      },
      { id: crypto?.randomUUID?.() ?? `demo-${Date.now()}-2`, type: "expense", amount: 220000, category: "food", date: `${month}-03`, note: "Supermercado" },
      { id: crypto?.randomUUID?.() ?? `demo-${Date.now()}-3`, type: "expense", amount: 60000, category: "transport", date: `${month}-05`, note: "Gasolina" },
      { id: crypto?.randomUUID?.() ?? `demo-${Date.now()}-4`, type: "expense", amount: 120000, category: "utilities", date: `${month}-07`, note: "Internet" },
      { id: crypto?.randomUUID?.() ?? `demo-${Date.now()}-5`, type: "expense", amount: 180000, category: "shopping", date: `${month}-10`, note: "Compras" },
      { id: crypto?.randomUUID?.() ?? `demo-${Date.now()}-6`, type: "expense", amount: 90000, category: "entertainment", date: `${month}-12`, note: "Cine / streaming" },
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
      setGoals([]);
    }
  }

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
        return { category, categoryLabel: prettyCategory(category), amount, prevAmount, delta };
      })
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    const hasAny = rows.length > 0;

    return {
      hasAny,
      rows,
      title: "Insight",
      subtitle: hasAny ? "Tus 3 categorías con más gasto este mes" : "Aún no hay gastos este mes",
      hint: hasAny ? `Comparación contra ${prevMonth}` : "Tip: usa “+ Agregar” para registrar un gasto rápido.",
      compareMonth: prevMonth,
    };
  }, [monthTransactions, prevMonthTransactions, prevMonth]);

  const monthBudgets = useMemo(() => budgetLimits.filter((b) => b.month === month), [budgetLimits, month]);

  function upsertBudget(entry: BudgetLimit) {
    setBudgetLimits((prev) => {
      const filtered = prev.filter((b) => !(b.month === entry.month && b.category === entry.category));
      return [entry, ...filtered];
    });
  }

  function deleteBudget(monthKey: string, category: string) {
    setBudgetLimits((prev) => prev.filter((b) => !(b.month === monthKey && b.category === category)));
  }

  const budgetAlerts = useMemo(() => {
    const spent = new Map<string, number>();
    for (const t of monthTransactions) {
      if (t.type !== "expense") continue;
      spent.set(t.category, (spent.get(t.category) ?? 0) + t.amount);
    }

    const alerts: { kind: "danger" | "warn" | "ok"; title: string; detail: string }[] = [];

    for (const b of monthBudgets) {
      if (!Number.isFinite(b.limit) || b.limit <= 0) continue;

      const s = spent.get(b.category) ?? 0;
      const ratio = s / b.limit;
      const remaining = b.limit - s;

      if (ratio >= 1) {
        alerts.push({
          kind: "danger",
          title: `Excediste ${prettyCategory(b.category)}`,
          detail: `Gastaste ${formatCRC(s)} de ${formatCRC(b.limit)} (restante ${formatCRC(remaining)}).`,
        });
      } else if (ratio >= 0.8) {
        alerts.push({
          kind: "warn",
          title: `Cerca del límite en ${prettyCategory(b.category)}`,
          detail: `Vas en ${(ratio * 100).toFixed(0)}% — te quedan ${formatCRC(remaining)}.`,
        });
      } else if (ratio <= 0.5 && s > 0) {
        alerts.push({
          kind: "ok",
          title: `Vas bien en ${prettyCategory(b.category)}`,
          detail: `Solo usaste ${(ratio * 100).toFixed(0)}% — te quedan ${formatCRC(remaining)}.`,
        });
      }
    }

    const kindOrder = { danger: 0, warn: 1, ok: 2 } as const;
    alerts.sort((a, b) => kindOrder[a.kind] - kindOrder[b.kind]);
    return alerts.slice(0, 4);
  }, [monthTransactions, monthBudgets]);

  function upsertGoal(goal: Goal) {
    setGoals((prev) => {
      const filtered = prev.filter((g) => !(g.month === goal.month && g.type === goal.type));
      return [goal, ...filtered];
    });
  }

  function deleteGoal(monthKey: string, type: Goal["type"]) {
    setGoals((prev) => prev.filter((g) => !(g.month === monthKey && g.type === type)));
  }

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
        <div className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            data-testid="cta-add-transaction"
            onClick={() => setAddOpen(true)}
            className="rounded-2xl shadow-lg border border-slate-200 bg-slate-900 text-white px-4 py-3 text-sm font-medium hover:bg-slate-800 transition"
          >
            + Agregar
          </button>
        </div>

        <Modal open={addOpen} title="Agregar transacción" onClose={() => setAddOpen(false)}>
          <TransactionForm onAdd={addTransaction} defaultDate={defaultDate} />
        </Modal>

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/dashboard"
            element={
              <div className="space-y-10">
                <PageTitle title="Dashboard" subtitle="Resumen del mes y categorías" />
                
                <SummaryCards
                  income={totals.income}
                  expense={totals.expense}
                  balance={totals.balance}
                  prevIncome={prevTotals.income}
                  prevExpense={prevTotals.expense}
                />

                <GoalsMiniCard month={month} balance={totals.balance} goals={goals} />

                <AlertCard items={budgetAlerts} />

                {/* ✅ Insight card con testids + data estable */}
                <div
                  data-testid="insight-card"
                  data-compare-month={topCategoriesInsight.compareMonth}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
                >
                  <div data-testid="insight-title" className="text-sm font-medium">
                    {topCategoriesInsight.title}
                  </div>
                  <div data-testid="insight-subtitle" className="mt-1 text-xs text-slate-500">
                    {topCategoriesInsight.subtitle}
                  </div>

                  {topCategoriesInsight.hasAny ? (
                    <div data-testid="insight-list" className="mt-4 space-y-2">
                      {topCategoriesInsight.rows.map((r, idx) => {
                        const arrow =
                          r.prevAmount === 0 ? "•" : r.delta > 0 ? "▲" : r.delta < 0 ? "▼" : "•";

                        const deltaText =
                          r.prevAmount === 0
                            ? `Sin historial en ${topCategoriesInsight.compareMonth}`
                            : r.delta === 0
                            ? `Igual que ${topCategoriesInsight.compareMonth}`
                            : `${formatCRC(Math.abs(r.delta))} ${r.delta > 0 ? "más" : "menos"} que ${
                                topCategoriesInsight.compareMonth
                              }`;

                        return (
                          <div
                            key={r.category}
                            data-testid="insight-item"
                            data-rank={String(idx + 1)}
                            data-category={r.category}
                            data-amount={String(Math.round(r.amount))}
                            data-compare-month={topCategoriesInsight.compareMonth}
                            className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-3 py-2"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                data-testid="insight-rank"
                                className="w-6 text-center text-sm font-semibold text-slate-700"
                              >
                                {idx + 1}
                              </div>
                              <div>
                                <div data-testid="insight-category" className="text-sm font-medium text-slate-900">
                                  {r.categoryLabel}
                                </div>
                                <div data-testid="insight-meta" className="text-xs text-slate-500">
                                  {arrow} {deltaText}
                                </div>
                              </div>
                            </div>

                            <div data-testid="insight-amount" className="text-sm font-semibold text-slate-900">
                              {formatCRC(r.amount)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div data-testid="insight-empty" className="mt-3 text-sm text-slate-600">
                      Agrega un gasto para ver tu ranking de categorías.
                    </div>
                  )}

                  <div data-testid="insight-footer" className="mt-3 text-xs text-slate-500">
                    {topCategoriesInsight.hint}
                  </div>
                </div>


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
                <TransactionForm onAdd={addTransaction} defaultDate={defaultDate} />
                <TransactionList transactions={monthTransactions} onDelete={deleteTransaction} />
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
              <div className="space-y-6">
                <PageTitle title="Metas" subtitle="Ahorro mensual y progreso" />
                <GoalsManager
                  month={month}
                  balance={totals.balance}
                  goals={goals}
                  onUpsertGoal={upsertGoal}
                  onDeleteGoal={deleteGoal}
                />
              </div>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}
