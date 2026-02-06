// /POM/tests/dashboard.smoke.spec.js
import { test, expect } from '@playwright/test'; // voy a escribir un test
import { DashboardPage } from '../pages/dashboard.page.js'; // voy a usar el POM del dashboard


test('Dashboard - ir a Metas desde Goal card', async ({ page }) => {
  // 1) Ir al sitio con estado limpio
  await page.goto('http://localhost:5173'); // abro el sitio
  await page.evaluate(() => localStorage.clear()); // borro los datos anteriores
  await page.reload(); // recargo

  // 2) Crear el POM después del reload
  const dashboard = new DashboardPage(page);

  // 3) Esperar que cargue Dashboard
  await dashboard.waitForLoaded();

  // 4) Click en "Ver Metas"
  await dashboard.clickGoToGoals(); 

  // 5) Assert navegación 
  await expect(page).toHaveURL('http://localhost:5173/metas'); 
  
});
