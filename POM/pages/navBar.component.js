import { expect } from '@playwright/test';

export class NavBar {
  constructor(page) {
    this.page = page;

    // ===== Locators =====
    this.dashboardNav = page.getByRole('link', { name: 'Dashboard' });
    this.gastosNav = page.getByRole('link', { name: 'Gastos' });
    this.presupuestoNav = page.getByRole('link', { name: 'Presupuesto' });
    this.metasNav = page.getByRole('link', { name: 'Metas' });
  }

  // ===== Acciones (una por método) =====
  async goToDashboard() {
    await expect(this.dashboardNav).toBeVisible();
    await this.dashboardNav.click();
  }

  async goToGastos() {
    await expect(this.gastosNav).toBeVisible();
    await this.gastosNav.click();
  }

  async goToPresupuesto() {
    await expect(this.presupuestoNav).toBeVisible();
    await this.presupuestoNav.click();
  }

  async goToMetas() {
    await expect(this.metasNav).toBeVisible();
    await this.metasNav.click();
  }
}
