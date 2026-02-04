// /POM/pages/dashboard.page.js
import { expect } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
    this.page = page;

    // ===== Header =====
    this.title = page.getByRole('heading', { name: 'Dashboard' });
    this.subtitle = page.getByText('Resumen del mes y categorías');


    // ===== Goal Progress Bar =====
    this.goalCard = page.getByTestId('goal-progress-card');
    this.goalTitle = page.getByTestId('goal-progress-title');
    this.goalSubtitle = page.getByTestId('goal-progress-subtitle');
    this.goalDetail = page.getByTestId('goal-progress-detail');
    this.goToGoalsBtn = page.getByTestId('go-to-goals');
    this.goalBar = page.getByTestId('goal-progress-bar');
    this.goalBarFill = page.getByTestId('goal-progress-bar-fill');
    this.goalPercent = page.getByTestId('goal-progress-percent');

    // ===== Insight Card =====
    this.insightCard = page.getByTestId('insight-card');
    this.insightTitle = page.getByTestId('insight-title');
    this.insightSubtitle = page.getByTestId('insight-subtitle');
    this.insightList = page.getByTestId('insight-list');
    this.insightItems = page.getByTestId('insight-item'); // multiple
    this.insightFooter = page.getByTestId('insight-footer');

    // ===== Summary cards =====
    this.summaryGrid = page.getByTestId('summary-cards');
    this.incomeCard = page.getByTestId('summary-income-card');
    this.incomeValue = page.getByTestId('summary-income-value');
    this.expenseCard = page.getByTestId('summary-expense-card');
    this.expenseValue = page.getByTestId('summary-expense-value');
    this.balanceCard = page.getByTestId('summary-balance-card');
    this.balanceValue = page.getByTestId('summary-balance-value');
    this.balanceStatus = page.getByTestId('summary-balance-status');

    // ===== Category Chart =====
    this.categoryChart = page.getByTestId('category-chart');
    this.categoryChartTitle = page.getByTestId('category-chart-title');
    this.categoryChartList = page.getByTestId('category-chart-list');
    this.categoryChartItems = page.getByTestId('category-chart-item'); // multiple
    this.categoryChartFooter = page.getByTestId('category-chart-footer');
  }

  // ===== “Page ready”  =====
  async waitForLoaded() {
    await expect(this.title).toBeVisible();
    await expect(this.subtitle).toBeVisible();

    await expect(this.goalCard).toBeVisible();
    await expect(this.summaryGrid).toBeVisible();

  }

  // ===== Opcional: úsalo solo en tests que sí requieran el chart =====
  async waitForCategoryChart(timeout = 15000) {
    await expect(this.categoryChart).toBeVisible({ timeout });
  }

  // ===== Acciones =====
  async clickGoToGoals() {
    await expect(this.goToGoalsBtn).toBeVisible();
    await expect(this.goToGoalsBtn).toBeEnabled();
    await this.goToGoalsBtn.click();
  }
}
