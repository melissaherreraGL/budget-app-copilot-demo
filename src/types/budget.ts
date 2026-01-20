export type BudgetLimit = {
  month: string; // "YYYY-MM"
  category: string;
  limit: number; // >= 0
};
