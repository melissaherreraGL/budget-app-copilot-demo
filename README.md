# 📊 Budget App – Copilot Demo

Aplicación web sencilla para el manejo de presupuesto personal, construida como demo de aprendizaje usando GitHub Copilot.

Permite registrar ingresos y gastos, visualizar un resumen mensual, ver los gastos por categoría en un gráfico, y almacenar la información localmente en el navegador.

---

## ✨ Funcionalidades

- **📅 Selector de mes** – Navega entre meses fácilmente
- **➕ Registro de ingresos y gastos** – Añade movimientos rápidamente
- **🧮 Resumen mensual:**
  - Total de ingresos
  - Total de gastos
  - Balance neto
- **📋 Listado de movimientos** – Con opción de eliminar
- **📊 Gráfico de gastos por categoría** – Visualización clara
- **🏆 Indicadores:**
  - "Gastaste más en…"
  - Top 3 categorías del mes
- **💾 Persistencia en localStorage** – Sin necesidad de backend
- **🧪 Utilidades:**
  - Cargar datos de ejemplo (demo)
  - Limpiar datos

---

## 🛠️ Stack Tecnológico

- **React** + **Vite**
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (visualización de gráficos)
- **localStorage** (persistencia de datos)

---

## 🎯 Objetivo del Proyecto

Este proyecto fue creado como un demo práctico para mostrar:

- Cómo usar GitHub Copilot para acelerar el desarrollo
- Trabajo incremental por componentes
- Buenas prácticas con TypeScript
- UI moderna, simple y fácil de usar
- Enfoque en funcionalidad real, no solo código generado

---

## 🚀 Instalación y Ejecución

```bash
npm install
npm run dev
```

Luego abre tu navegador en: **http://localhost:5173**

---

## 🧱 Estructura del Proyecto

```
src/
  components/
    MonthPicker.tsx
    SummaryCards.tsx
    TransactionForm.tsx
    TransactionList.tsx
    CategoryChart.tsx
  hooks/
    useLocalStorage.ts
  types/
    transaction.ts
  utils/
    date.ts
    format.ts
  App.tsx
  main.tsx
  index.css
```

---

## 🧠 Uso de GitHub Copilot

**Metodología:**
- Se definieron requerimientos claros antes de generar código
- Se trabajó por pasos incrementales:
  1. Setup del proyecto
  2. Tipos y hooks
  3. Componentes pequeños
  4. Integración
  5. Refinamiento de UI

**Rol de Copilot:**
- Generación de código base
- Asistencia en refactorización
- Mejora de UI/UX
- Sugerencias de estructura

**Validación:**
- Todo el código fue revisado, ajustado y validado manualmente

---

## 🔮 Posibles Mejoras Futuras

- [ ] Edición de movimientos existentes
- [ ] Filtros avanzados por categoría
- [ ] Exportar datos (CSV/PDF)
- [ ] Soporte multi-moneda
- [ ] Backend (API + autenticación)
- [ ] Tests (unitarios y E2E)

---

## 👤 Autor

**Melissa Herrera Rodríguez**

Demo creado como ejercicio práctico de aprendizaje y presentación de GitHub Copilot.