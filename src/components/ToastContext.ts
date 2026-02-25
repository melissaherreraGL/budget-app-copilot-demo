import { createContext } from "react";

export type ToastKind = "success" | "error" | "info";

export type ToastItem = {
  id: string;
  kind: ToastKind;
  title: string;
  message?: string;
};

export type ToastContextValue = {
  showToast: (t: Omit<ToastItem, "id">) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);
