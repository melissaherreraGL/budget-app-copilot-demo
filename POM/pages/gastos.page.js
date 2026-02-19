import { expect } from "@playwright/test";

export class GastosPage {
  constructor(page) {
    this.page = page;

    // locators
    this.gastosLink = page.getByRole("link", { name: "Gastos" });
    this.date = page.getByTestId("date");
    this.type = page.getByTestId("transaction-type");
    this.category = page.getByTestId("category");
    this.amount = page.getByTestId("amount");
    this.note = page.getByTestId("note");
    this.submit = page.getByTestId("submit-transaction");
    this.list = page.getByTestId("transactions-list");
  }

  // navegación + setup
  async goto() {
    await this.page.goto("/");
  }

  async clearStorageAndReload() {
    await this.page.evaluate(() => localStorage.clear());
    await this.page.reload();
  }

  async goToGastos() {
    await this.gastosLink.click();
    await expect(this.page).toHaveURL(/.*\/gastos$/);
  }

  // helpers
  async getVisibleMonthKey() {
    const defaultDate = await this.date.inputValue(); // YYYY-MM-DD
    return defaultDate.slice(0, 7);
  }

  // acciones
  async fillExpense({ amount, note, date, category = "food" }) {
    await this.type.selectOption("expense");
    await this.category.selectOption(category);

    await this.amount.fill(amount);
    await expect(this.amount).toHaveValue(amount);

    await this.note.fill(note);
    await expect(this.note).toHaveValue(note);

    await this.date.fill(date);
    await expect(this.date).toHaveValue(date);
  }

  async submitExpense() {
    await this.submit.click();
  }

  //Click en delete dentro de una fila
  async deleteRow(row) {
    await expect(row).toBeVisible();
    await row.getByTestId("delete-transaction").click();
    await expect(row).toHaveCount(0); // valida que se eliminó
  }

  // asserts
  async expectListVisible() {
    await expect(this.list).toBeVisible();
  }

  transactionRowByNote(noteRegex) {
    return this.list
      .getByTestId("transaction-row")
      .filter({ hasText: noteRegex });
  }

  async expectExpenseRow(row, { category, amount }) {
    await expect(row).toBeVisible();
    await expect(row).toHaveAttribute("data-type", "expense");
    await expect(row).toHaveAttribute("data-category", category);
    await expect(row).toHaveAttribute("data-amount", amount);
  }
  // borra por row (reusa lo que ya hiciste)
  async deleteExpenseByNote(noteRegex) {
    const row = this.transactionRowByNote(noteRegex).first();
    await this.deleteRow(row);
  }
}
