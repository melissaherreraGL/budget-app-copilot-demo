import React, { useMemo, useState } from "react";
import { ToastContext, type ToastItem } from "./ToastContext";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function showToast(t: Omit<ToastItem, "id">) {
    const id = crypto?.randomUUID?.() ?? `toast-${Date.now()}-${Math.random()}`;
    const item: ToastItem = { id, ...t };

    setToasts((prev) => [item, ...prev]);

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 3500);
  }

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        className="fixed top-4 right-4 z-[9999] flex w-[320px] flex-col gap-2"
        aria-live="polite"
        aria-relevant="additions"
        data-testid="toast-viewport"
      >
        {toasts.map((t) => {
          const icon = t.kind === "success" ? "✅" : t.kind === "error" ? "❌" : "ℹ️";
          const border =
            t.kind === "success"
              ? "border-green-200"
              : t.kind === "error"
              ? "border-red-200"
              : "border-slate-200";

          return (
            <div
              key={t.id}
              data-testid="toast"
              data-kind={t.kind}
              className={`rounded-xl border ${border} bg-white shadow-sm p-3`}
            >
              <div className="flex items-start gap-2">
                <div className="text-lg leading-none">{icon}</div>
                <div className="min-w-0">
                  <div data-testid="toast-title" className="text-sm font-medium text-slate-900">
                    {t.title}
                  </div>
                  {t.message ? (
                    <div data-testid="toast-message" className="mt-1 text-xs text-slate-600">
                      {t.message}
                    </div>
                  ) : null}
                </div>

                <button
                  type="button"
                  aria-label="Cerrar toast"
                  className="ml-auto text-slate-400 hover:text-slate-600"
                  onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                  data-testid="toast-close"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
