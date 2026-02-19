import { test, expect } from "@playwright/test";
import { GastosPage } from "../pages/gastos.page";

test("Agregar un gasto, aparece en la lista del mes seleccionado y se elimina", async ({ page }) => {
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

// confirmo que existe
    const row = gastos.transactionRowByNote(/almuerzo en restaurante/i);
    await gastos.expectExpenseRow(row, {
      category: "food",
      amount: "5000"});

    //Lo elimina
    await gastos.deleteExpenseByNote(/almuerzo en restaurante/i);

    // Assert final: ya no está
    await expect(gastos.transactionRowByNote(/almuerzo en restaurante/i)).toHaveCount(0);
  });






