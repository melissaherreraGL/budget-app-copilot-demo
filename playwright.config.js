// ESM: usa import/export
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({ // Configuración global
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },

  // Ejecuta en paralelo
  fullyParallel: true,

  // Reporte visual útil
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']],

  use: {
    // Navegador y utilidades
    browserName: 'chromium',
    headless: false,               // pon true en CI
    trace: 'on-first-retry',       // traza para depurar fallos
    screenshot: 'only-on-failure', // capturas en fallos
    video: 'retain-on-failure',    // video en fallos
    baseURL: 'https://example.com' // opcional para usar page.goto('/') 
  },

  // Ejecuta en desktop Chrome por defecto
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit',  use: { ...devices['Desktop Safari'] } },
  ],
});
