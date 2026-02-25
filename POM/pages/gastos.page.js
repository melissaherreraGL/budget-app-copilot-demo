import { expect } from "@playwright/test";

export class GastosPage {
  constructor(page) {
    this.page = page;

    // Scope: Form inline (create) -> el primer form en /gastos
    this.createForm = page.locator("form").first();

    // Scope: Modal de editar (esto viene de Modal.tsx)
    this.editModal = page.getByTestId("modal-container");

    // Lista
    this.list = page.getByTestId("transactions-list");

    // Toast
    this.toastTitle = page.getByTestId("toast-title");
    this.toastMessage = page.getByTestId("toast-message");
  }

  // ---------- navegación ----------
  async goTo() {
    await this.page.goto("/gastos");
    await expect(this.page).toHaveURL(/\/gastos$/);

    // Validar que el form inline existe
    await expect(this.createForm.getByTestId("amount")).toBeVisible({ timeout: 15000 });
  }

  async clearStorage() {
    await this.page.evaluate(() => localStorage.clear());
    await this.page.reload();
  }

  // ---------- helpers ----------
  async getVisibleMonthKey() {
    const defaultDate = await this.createForm.getByTestId("date").inputValue();
    return defaultDate.slice(0, 7);
  }

  transactionRowByNote(noteRegex) {
    return this.list.getByTestId("transaction-row").filter({ hasText: noteRegex });
  }

  // ---------- crear gasto (form inline) ----------
  async fillExpense({ amount, note, date, category = "food" }) {
    const form = this.createForm;

    await form.getByTestId("transaction-type").selectOption("expense");
    await form.getByTestId("category").selectOption(category);

    await form.getByTestId("amount").fill(amount);
    await expect(form.getByTestId("amount")).toHaveValue(amount);

    await form.getByTestId("note").fill(note);
    await expect(form.getByTestId("note")).toHaveValue(note);

    await form.getByTestId("date").fill(date);
    await expect(form.getByTestId("date")).toHaveValue(date);
  }

  async submitExpense() {
    await this.createForm.getByTestId("submit-transaction").click();
  }

  // ---------- asserts ----------
  async expectExpenseRow(row, { category, amount }) {
    await expect(row).toBeVisible({ timeout: 15000 });
    await expect(row).toHaveAttribute("data-type", "expense");
    await expect(row).toHaveAttribute("data-category", category);
    await expect(row).toHaveAttribute("data-amount", amount);
  }

  async deleteRow(row) {
    await expect(row).toBeVisible({ timeout: 15000 });
    await row.getByTestId("delete-transaction").click();
    await expect(row).toHaveCount(0);
  }

  // ---------- toasts ----------
  async expectToastTitle(titleRegex) {
    const first = this.toastTitle.first();
    await expect(first).toBeVisible({ timeout: 10000 });
    await expect(first).toHaveText(titleRegex);
  }

  async expectToastMessage(messageRegex) {
    const first = this.toastMessage.first();
    await expect(first).toBeVisible({ timeout: 10000 });
    await expect(first).toHaveText(messageRegex);
  }

  // ---------- editar (modal) ----------
  async openEditForRow(row) {
    await expect(row).toBeVisible({ timeout: 15000 });
    await row.getByTestId("edit-transaction").click();

    // Modal real
    await expect(this.editModal).toBeVisible({ timeout: 15000 });

    // input dentro del modal (sin ambiguity)
    await expect(this.editModal.getByTestId("amount")).toBeVisible({ timeout: 15000 });
  }

  async editExpense({ amount, note, date, category }) {
    await expect(this.editModal).toBeVisible({ timeout: 15000 });

    if (amount !== undefined) await this.editModal.getByTestId("amount").fill(amount);
    if (note !== undefined) await this.editModal.getByTestId("note").fill(note);
    if (date !== undefined) await this.editModal.getByTestId("date").fill(date);
    if (category !== undefined) await this.editModal.getByTestId("category").selectOption(category);

    await this.editModal.getByTestId("submit-transaction").click();

    // modal se cierra al guardar
    await expect(this.editModal).toBeHidden({ timeout: 15000 });
  }
}
