import { test } from "@playwright/test";
import { GastosPage } from "../pages/gastos.page";

test("agrega un gasto y aparece en la lista del mes seleccionado", async ({ page }) => {
  const gastos = new GastosPage(page);

  await gastos.goto();
  await gastos.clearStorageAndReload();
  await gastos.goToGastos();

  const monthKey = await gastos.getVisibleMonthKey();
  const fixedDate = `${monthKey}-15`;

  await gastos.fillExpense({
    amount: "5000",
    note: "Almuerzo en restaurante",
    date: fixedDate,
  });

  await gastos.submitExpense();

  const row = gastos.transactionRowByNote(/almuerzo en restaurante/i);
  await gastos.expectExpenseRow(row, {
    category: "food",
    amount: "5000",
  });
});
