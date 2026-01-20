import { useMemo, useState } from "react";
import type { Goal } from "../types/goal";
import { formatCRC } from "../utils/money";

function clamp01(x: number) {
  if (x < 0) return 0;
  if (x > 1) return 1;
  return x;
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

export function GoalsManager({
  month,
  balance,
  goals,
  onUpsertGoal,
  onDeleteGoal,
}: {
  month: string;
  balance: number; // ingresos - gastos del mes
  goals: Goal[];
  onUpsertGoal: (goal: Goal) => void;
  onDeleteGoal: (month: string, type: Goal["type"]) => void;
}) {
  const [targetInput, setTargetInput] = useState<string>("");

  const currentGoal = useMemo(() => {
    return goals.find((g) => g.month === month && g.type === "savings") ?? null;
  }, [goals, month]);

  const target = currentGoal?.target ?? 0;

  const ratio = useMemo(() => {
    if (target <= 0) return 0;
    return balance / target;
  }, [balance, target]);

  const status = useMemo(() => {
    if (!currentGoal || target <= 0) return "none";
    if (balance >= target) return "done";
    if (balance >= target * 0.8) return "near";
    return "progress";
  }, [currentGoal, target, balance]);

  const statusLabel =
    status === "done"
      ? "Meta lograda"
      : status === "near"
      ? "Cerca"
      : status === "progress"
      ? "En camino"
      : "Sin meta";

  const statusIcon =
    status === "done"
      ? "✅"
      : status === "near"
      ? "⚠️"
      : status === "progress"
      ? "🎯"
      : "•";

  const remaining = target - balance;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(targetInput);
    if (!Number.isFinite(n) || n < 0) return;

    onUpsertGoal({
      month,
      type: "savings",
      target: Math.round(n), // ✅ colones sin decimales
    });

    setTargetInput("");
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <h3 className="text-base font-medium">Meta de ahorro mensual</h3>
            <p className="text-sm text-slate-500 mt-1">
              Se calcula con tu balance del mes:{" "}
              <span className="font-medium">ingresos - gastos</span>.
            </p>
          </div>
          <div className="text-sm text-slate-600">
            Mes: <span className="font-medium text-slate-900">{month}</span>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          <div className="sm:col-span-2">
            <label className="text-xs text-slate-600">Meta de ahorro (mensual) (₡)</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              inputMode="numeric"
              placeholder="Ej: 250000"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
            />
            <div className="mt-1 text-xs text-slate-500">
              Colones (CRC). Ejemplo demo: 150k–400k.
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

        {currentGoal ? (
          <div className="mt-3 flex items-center justify-between gap-3 flex-col sm:flex-row">
            <div className="text-sm text-slate-700">
              Meta actual:{" "}
              <span className="font-medium text-slate-900">{formatCRC(target)}</span>
            </div>
            <button
              type="button"
              onClick={() => onDeleteGoal(month, "savings")}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 transition"
            >
              Quitar meta
            </button>
          </div>
        ) : null}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <div className="text-sm font-medium">
              {statusIcon} Estado: {statusLabel}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Balance del mes:{" "}
              <span className="font-medium">{formatCRC(balance)}</span>
            </div>
          </div>

          {currentGoal ? (
            <div className="text-sm text-slate-700">
              {balance >= target ? (
                <span className="font-medium text-slate-900">
                  ¡Lograste la meta! 🎉
                </span>
              ) : (
                <>
                  Te faltan{" "}
                  <span className="font-medium text-slate-900">
                    {formatCRC(remaining)}
                  </span>{" "}
                  para llegar.
                </>
              )}
            </div>
          ) : (
            <div className="text-sm text-slate-600">
              Define una meta para ver tu progreso.
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="text-xs text-slate-500 mb-2">Progreso</div>
          <ProgressBar ratio={currentGoal && target > 0 ? ratio : 0} />
        </div>
      </div>
    </div>
  );
}
