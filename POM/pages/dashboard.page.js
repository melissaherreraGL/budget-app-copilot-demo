// /POM/pages/dashboard.page.js
import { expect } from "@playwright/test";

export class DashboardPage {
  constructor(page) {
    this.page = page;

    // ✅ Evita role aquí: a veces el accessible name no coincide
    this.title = page.locator("h2", { hasText: "Dashboard" });
    this.subtitle = page.getByText("Resumen del mes y categorías", { exact: true });

    // goal progress bar
    this.goalCard = page.getByTestId("goal-progress-card");
    this.goalTitle = page.getByTestId("goal-progress-title");
    this.goalSubtitle = page.getByTestId("goal-progress-subtitle");
    this.goalDetail = page.getByTestId("goal-progress-detail");
    this.goToGoalsBtn = page.getByTestId("go-to-goals");
    this.goalBar = page.getByTestId("goal-progress-bar");
    this.goalBarFill = page.getByTestId("goal-progress-bar-fill");
    this.goalPercent = page.getByTestId("goal-progress-percent");

    // insight card
    this.insightCard = page.getByTestId("insight-card");
    this.insightTitle = page.getByTestId("insight-title");
    this.insightSubtitle = page.getByTestId("insight-subtitle");
    this.insightList = page.getByTestId("insight-list");
    this.insightItems = page.getByTestId("insight-item");
    this.insightFooter = page.getByTestId("insight-footer");

    // summary card
    this.summaryGrid = page.getByTestId("summary-cards");
    this.incomeCard = page.getByTestId("summary-income-card");
    this.incomeValue = page.getByTestId("summary-income-value");
    this.expenseCard = page.getByTestId("summary-expense-card");
    this.expenseValue = page.getByTestId("summary-expense-value");
    this.balanceCard = page.getByTestId("summary-balance-card");
    this.balanceValue = page.getByTestId("summary-balance-value");
    this.balanceStatus = page.getByTestId("summary-balance-status");

    // category chart
    this.categoryChart = page.getByTestId("category-chart");
    this.categoryChartTitle = page.getByTestId("category-chart-title");
    this.categoryChartList = page.getByTestId("category-chart-list");
    this.categoryChartItems = page.getByTestId("category-chart-item");
    this.categoryChartFooter = page.getByTestId("category-chart-footer");

    this.mainNav = page.getByTestId("main-nav");
    this.navDashboard = page.getByTestId("nav-dashboard");
  }



  // ✅ Señal de "cargó": testids (más estable que texto/role)
  async waitForLoaded(timeout = 20000) {
    // 1) confirmo que el layout correcto cargó
    await expect(this.mainNav).toBeVisible({ timeout });

    // 2) confirmo que estoy en el dashboard (tab existe)
    await expect(this.navDashboard).toBeVisible({ timeout });

    // 3) ahora sí espero contenido del dashboard
    await expect(this.goalCard).toBeVisible({ timeout });
    await expect(this.summaryGrid).toBeVisible({ timeout });
  }

  async waitForCategoryChart(timeout = 15000) {
    await expect(this.categoryChart).toBeVisible({ timeout });
  }

  async clickGoToGoals() {
    await expect(this.goToGoalsBtn).toBeVisible({ timeout: 20000 });
    await expect(this.goToGoalsBtn).toBeEnabled();
    await this.goToGoalsBtn.click();
  }
}
