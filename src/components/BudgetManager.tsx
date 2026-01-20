import { useMemo, useState } from "react";
import type { Transaction } from "../types/transaction";
import type { BudgetLimit } from "../types/budget";

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

function clamp01(x: number) {
  if (x < 0) return 0;
  if (x > 1) return 1;
  return x;
}

function statusFromRatio(ratio: number) {
  if (!Number.isFinite(ratio)) return "none";
  if (ratio >= 1) return "over";
  if (ratio >= 0.8) return "near";
  return "ok";
}

function ProgressBar({ ratio }: { ratio: number }) {
  const pct = Math.round(clamp01(ratio) * 100);
  return (
    <div className="w-full">
      <div className="h-2 w-full rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
        <div className="h-2 bg-slate-900" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1 text-xs text-slate-500">{pct}%</div>
    </div>
  );
}

export function BudgetManager({
  month,
  monthTransactions,
  budgets,
  onUpsertBudget,
  onDeleteBudget,
}: {
  month: string;
  monthTransactions: Transaction[];
  budgets: BudgetLimit[];
  onUpsertBudget: (entry: BudgetLimit) => void;
  onDeleteBudget: (month: string, category: string) => void;
}) {
  const [category, setCategory] = useState<string>("food");
  const [limitInput, setLimitInput] = useState<string>("");

  const spentByCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const t of monthTransactions) {
      if (t.type !== "expense") continue;
      map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
    }
    return map;
  }, [monthTransactions]);

  const budgetMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const b of budgets) {
      map.set(b.category, b.limit);
    }
    return map;
  }, [budgets]);

  const allCategories = useMemo(() => {
    const set = new Set<string>();

    // categorías con gasto
    for (const key of spentByCategory.keys()) set.add(key);

    // categorías con presupuesto
    for (const key of budgetMap.keys()) set.add(key);

    // “defaults” para que se vea bien aunque no haya data
    Object.keys(CATEGORY_LABELS).forEach((k) => set.add(k));

    return Array.from(set.values()).sort((a, b) =>
      prettyCategory(a).localeCompare(prettyCategory(b))
    );
  }, [spentByCategory, budgetMap]);

  const rows = useMemo(() => {
    return allCategories
      .map((cat) => {
        const spent = spentByCategory.get(cat) ?? 0;
        const limit = budgetMap.get(cat) ?? 0;
        const remaining = limit - spent;
        const ratio = limit > 0 ? spent / limit : Number.POSITIVE_INFINITY; // si limit=0 y hay gasto, se verá “over”
        const status = limit > 0 ? statusFromRatio(ratio) : spent > 0 ? "over" : "none";

        return {
          category: cat,
          label: prettyCategory(cat),
          spent,
          limit,
          remaining,
          ratio: limit > 0 ? ratio : spent > 0 ? 1 : 0,
          status,
          hasBudget: budgetMap.has(cat),
        };
      })
      // más útiles primero: over > near > ok > none
      .sort((a, b) => {
        const order = { over: 0, near: 1, ok: 2, none: 3 } as const;
        return order[a.status as keyof typeof order] - order[b.status as keyof typeof order];
      });
  }, [allCategories, spentByCategory, budgetMap]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(limitInput);
    if (!Number.isFinite(n) || n < 0) return;

    onUpsertBudget({
      month,
      category,
      limit: Math.round(n * 100) / 100,
    });

    setLimitInput("");
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <h3 className="text-base font-medium">Presupuesto por categoría</h3>
            <p className="text-sm text-slate-500 mt-1">
              Define un límite mensual y mira tu progreso vs gastos reales.
            </p>
          </div>
          <div className="text-sm text-slate-600">
            Mes: <span className="font-medium text-slate-900">{month}</span>
          </div>
        </div>

        <form onSubmit={submit} className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-slate-600">Categoría</label>
            <select
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {allCategories.map((c) => (
                <option key={c} value={c}>
                  {prettyCategory(c)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-600">Límite (mensual)</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              inputMode="decimal"
              placeholder="Ej: 300"
              value={limitInput}
              onChange={(e) => setLimitInput(e.target.value)}
            />
            <div className="mt-1 text-xs text-slate-500">
              Tip: puedes dejarlo en 0 para “sin presupuesto”.
            </div>
          </div>

          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 text-white px-3 py-2 text-sm font-medium hover:bg-slate-800 transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>

      {/* Tabla/Lista */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200">
          <h3 className="text-sm font-medium">Tu estado por categoría</h3>
          <p className="text-xs text-slate-500 mt-1">
            Over = excedido · Near = cerca del límite · OK = en rango
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {rows.map((r) => {
            const badge =
              r.status === "over"
                ? "Excedido"
                : r.status === "near"
                ? "Cerca"
                : r.status === "ok"
                ? "OK"
                : "Sin presupuesto";

            return (
              <div key={r.category} className="p-4">
                <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-slate-900">{r.label}</div>
                      <span className="text-xs rounded-full border border-slate-200 px-2 py-0.5 text-slate-600">
                        {badge}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div>
                        <div className="text-xs text-slate-500">Límite</div>
                        <div className="font-medium">{formatMoney(r.limit)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Gastado</div>
                        <div className="font-medium">{formatMoney(r.spent)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Restante</div>
                        <div className={`font-medium ${r.remaining < 0 ? "text-red-600" : ""}`}>
                          {formatMoney(r.remaining)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Progreso</div>
                        <ProgressBar ratio={r.limit > 0 ? r.spent / r.limit : r.spent > 0 ? 1 : 0} />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {r.hasBudget ? (
                      <button
                        type="button"
                        onClick={() => onDeleteBudget(month, r.category)}
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 transition"
                      >
                        Quitar presupuesto
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
