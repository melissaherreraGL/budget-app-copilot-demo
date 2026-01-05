interface SummaryCardsProps {
  income: number;
  expense: number;
  balance: number;
}

export default function SummaryCards({
  income,
  expense,
  balance,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Ingresos
        </p>
        <p className="text-3xl font-semibold text-slate-900 mt-4">
          ${income.toFixed(2)}
        </p>
        <p className="text-sm text-green-600 font-medium mt-2">+2.5% vs mes anterior</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Gastos
        </p>
        <p className="text-3xl font-semibold text-slate-900 mt-4">
          ${expense.toFixed(2)}
        </p>
        <p className="text-sm text-red-500 font-medium mt-2">+1.2% vs mes anterior</p>
      </div>

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
        <p className={`text-sm font-medium mt-2 ${
          balance >= 0 ? "text-slate-500" : "text-red-500"
        }`}>
          {balance >= 0 ? "En orden" : "Déficit"}
        </p>
      </div>
    </div>
  );
}