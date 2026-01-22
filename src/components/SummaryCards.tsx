import { formatCRC } from "../utils/money";

interface SummaryCardsProps {
  income: number;
  expense: number;
  balance: number;
  prevIncome: number;
  prevExpense: number;
}

function percentChange(current: number, previous: number) {
  if (previous <= 0) return null; // no hay base para comparar
  const pct = ((current - previous) / previous) * 100;
  return Number.isFinite(pct) ? pct : null;
}

export default function SummaryCards({
  income,
  expense,
  balance,
  prevIncome,
  prevExpense,
}: SummaryCardsProps) {
  const incomePct = percentChange(income, prevIncome);
  const expensePct = percentChange(expense, prevExpense);

  return (
    <div data-testid="summary-cards" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Ingresos */}
      <div
        data-testid="summary-income-card"
        data-value={String(income)}
        className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
      >
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Ingresos
        </p>

        <p data-testid="summary-income-value" className="text-3xl font-semibold text-slate-900 mt-4">
          {formatCRC(income)}
        </p>

        {incomePct !== null && (
          <p data-testid="summary-income-delta" className="text-sm font-medium mt-2 text-green-600">
            {incomePct >= 0 ? "+" : ""}
            {incomePct.toFixed(1)}% vs mes anterior
          </p>
        )}
      </div>

      {/* Gastos */}
      <div
        data-testid="summary-expense-card"
        data-value={String(expense)}
        className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
      >
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Gastos
        </p>

        <p data-testid="summary-expense-value" className="text-3xl font-semibold text-slate-900 mt-4">
          {formatCRC(expense)}
        </p>

        {expensePct !== null && (
          <p data-testid="summary-expense-delta" className="text-sm font-medium mt-2 text-red-500">
            {expensePct >= 0 ? "+" : ""}
            {expensePct.toFixed(1)}% vs mes anterior
          </p>
        )}
      </div>

      {/* Balance */}
      <div
        data-testid="summary-balance-card"
        data-value={String(balance)}
        className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
      >
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Balance
        </p>

        <p
          data-testid="summary-balance-value"
          className={`text-3xl font-semibold mt-4 ${
            balance >= 0 ? "text-slate-900" : "text-red-600"
          }`}
        >
          {formatCRC(balance)}
        </p>

        <p
          data-testid="summary-balance-status"
          className={`text-sm font-medium mt-2 ${
            balance >= 0 ? "text-slate-500" : "text-red-500"
          }`}
        >
          {balance >= 0 ? "En orden" : "Déficit"}
        </p>
      </div>
    </div>
  );
}
