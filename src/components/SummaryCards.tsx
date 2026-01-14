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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Ingresos */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Ingresos
        </p>
        <p className="text-3xl font-semibold text-slate-900 mt-4">
          ${income.toFixed(2)}
        </p>

        {incomePct !== null && (
          <p className="text-sm font-medium mt-2 text-green-600">
            {incomePct >= 0 ? "+" : ""}
            {incomePct.toFixed(1)}% vs mes anterior
          </p>
        )}
      </div>

      {/* Gastos */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Gastos
        </p>
        <p className="text-3xl font-semibold text-slate-900 mt-4">
          ${expense.toFixed(2)}
        </p>

        {expensePct !== null && (
          <p className="text-sm font-medium mt-2 text-red-500">
            {expensePct >= 0 ? "+" : ""}
            {expensePct.toFixed(1)}% vs mes anterior
          </p>
        )}
      </div>

      {/* Balance */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Balance
        </p>
        <p
          className={`text-3xl font-semibold mt-4 ${
            balance >= 0 ? "text-slate-900" : "text-red-600"
          }`}
        >
          ${balance.toFixed(2)}
        </p>
        <p
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
