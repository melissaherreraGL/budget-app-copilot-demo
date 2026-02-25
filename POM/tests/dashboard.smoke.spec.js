import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page.js";

test("Dashboard - ir a Metas desde Goal card", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());

  await page.goto("/dashboard");

  // 🔎 DEBUG (temporal)
  console.log("URL final:", page.url());
  const bodyText = await page.locator("body").innerText();
  console.log("BODY:", bodyText.slice(0, 300));
  await page.screenshot({ path: "debug-dashboard.png", fullPage: true });

  const dashboard = new DashboardPage(page);
  await dashboard.waitForLoaded();

  await dashboard.clickGoToGoals();
  await expect(page).toHaveURL(/\/metas$/);
});
