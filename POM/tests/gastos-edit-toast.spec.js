import { test, expect } from "@playwright/test";
import { GastosPage } from "../pages/gastos.page";

test("Agregar gasto, editarlo y validar toast de actualizado", async ({ page }) => {
  const gastos = new GastosPage(page);

  await gastos.goTo();
  await gastos.clearStorage();
  await gastos.goTo();

  const monthKey = await gastos.getVisibleMonthKey();
  const fixedDate = `${monthKey}-15`;

  // 1) Agregar
  await gastos.fillExpense({
    amount: "5000",
    note: "Almuerzo en restaurante",
    date: fixedDate,
  });
  await gastos.submitExpense();

  await gastos.expectToastTitle(/transacción agregada/i);

  const createdRow = gastos.transactionRowByNote(/almuerzo en restaurante/i).first();
  await expect(createdRow).toBeVisible({ timeout: 15000 });

  // 2) Editar
  await gastos.openEditForRow(createdRow);

  await gastos.editExpense({
    amount: "7500",
    note: "Almuerzo editado",
  });

  // Toast de actualizado
  await gastos.expectToastTitle(/transacción actualizada/i);

  // 3) Validar cambio en la lista
  const editedRow = gastos.transactionRowByNote(/almuerzo editado/i).first();
  await expect(editedRow).toBeVisible({ timeout: 15000 });
  await expect(editedRow).toHaveAttribute("data-amount", "7500");
});
