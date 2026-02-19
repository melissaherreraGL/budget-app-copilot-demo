// /POM/tests/dashboard.smoke.spec.js
import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page.js";

test("Dashboard - ir a Metas desde Goal card", async ({ page }) => {
  // 1) Ir al sitio con estado limpio
  await page.goto("/dashboard");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // 2) Crear el POM después del reload
  const dashboard = new DashboardPage(page);

  // 3) Esperar que cargue Dashboard
  await dashboard.waitForLoaded();

  // 4) Click en "Ver Metas"
  await dashboard.clickGoToGoals();

  // 5) Assert navegación (sin hardcodear localhost)
  await expect(page).toHaveURL(/\/metas$/);
});
