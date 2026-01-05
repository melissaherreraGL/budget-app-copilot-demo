export type TransactionType = "income" | "expense";

export type Category =
  | "salary"
  | "freelance"
  | "investment"
  | "food"
  | "transport"
  | "utilities"
  | "entertainment"
  | "healthcare"
  | "shopping"
  | "other";

export const CATEGORY_LABELS: Record<Category, string> = {
  salary: "Salario",
  freelance: "Freelance",
  investment: "Inversión",
  food: "Comida",
  transport: "Transporte",
  utilities: "Servicios",
  entertainment: "Entretenimiento",
  healthcare: "Salud",
  shopping: "Compras",
  other: "Otro",
};

export const INCOME_CATEGORIES: Category[] = ["salary", "freelance", "investment"];
export const EXPENSE_CATEGORIES: Category[] = [
  "food",
  "transport",
  "utilities",
  "entertainment",
  "healthcare",
  "shopping",
  "other",
];

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category; // para income usaremos salary/freelance/investment
  date: string; // "YYYY-MM-DD" (más simple para forms)
  note?: string;
};
