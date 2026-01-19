import { test, expect } from '@playwright/test';

test('agrega un gasto y aparece en la lista del mes seleccionado', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Estado limpio antes de comenzar
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // Fija una fecha que seguro cae en el mes visible (el mes actual que trae la app)
  // Tomamos el valor actual del input date (que viene del defaultDate) y lo dejamos en el día 15
  const defaultDate = await page.getByTestId('date').inputValue(); // ej: "2026-01-01"
  const monthKey = defaultDate.slice(0, 7); // "2026-01"
  const fixedDate = `${monthKey}-15`;

  // Llenar form
  await page.getByTestId('transaction-type').selectOption('expense');
  await page.getByTestId('category').selectOption('food');

  await page.getByTestId('amount').fill('5000');
  await expect(page.getByTestId('amount')).toHaveValue('5000');

  await page.getByTestId('note').fill('Almuerzo en restaurante');
  await expect(page.getByTestId('note')).toHaveValue('Almuerzo en restaurante');

  await page.getByTestId('date').fill(fixedDate);
  await expect(page.getByTestId('date')).toHaveValue(fixedDate);

  // Submit
  await page.getByRole('button', { name: 'Agregar' }).click();

  // Assert: lista visible
  const list = page.getByTestId('transactions-list');
  await expect(list).toBeVisible();

  // Assert: row con nota
  const row = list
    .getByTestId('transaction-row')
    .filter({ hasText: /almuerzo en restaurante/i });

  await expect(row).toBeVisible();
  await expect(row).toContainText(/food/i);
  await expect(row).toContainText('-$5000.00');
});




