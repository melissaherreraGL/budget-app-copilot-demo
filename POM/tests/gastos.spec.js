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

  // Espera explícita por la fila que contiene la nota creada
  const createdRow = gastos.transactionRowByNote(/almuerzo en restaurante/i).first();
  await expect(createdRow).toBeVisible({ timeout: 15000 });

  // ahora los asserts sobre la fila
  await gastos.expectExpenseRow(createdRow, {
    category: "food",
    amount: "5000"
  });

  // Lo elimina
  await gastos.deleteRow(createdRow); // o await gastos.deleteExpenseByNote(/almuerzo en restaurante/i);

  // Assert final: ya no está
  await expect(gastos.transactionRowByNote(/almuerzo en restaurante/i)).toHaveCount(0);
  });






