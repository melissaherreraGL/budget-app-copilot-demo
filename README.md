# 💰 Budget App – Gestor de Presupuesto Personal

[![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646cff?style=flat&logo=vite)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38b2ac?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![Playwright](https://img.shields.io/badge/Playwright-Latest-00C853?style=flat&logo=microsoft)](https://playwright.dev)

Aplicación web moderna para gestionar tu presupuesto personal. Registra ingresos y gastos, analiza tus patrones de gasto, gestiona presupuestos por categoría y establece metas de ahorro. **Sin backend, todo offline** en tu navegador.

---

## ✨ Características Principales

### 📊 Dashboard Inteligente
- **Resumen mensual en tiempo real:** Ingresos, gastos, balance y saldo disponible
- **Comparación con mes anterior:** Visualiza el % de cambio en tus gastos
- **Gráficos interactivos:** Analiza gastos por categoría con Recharts
- **Indicadores smart:** Top 3 categorías, mayor gasto del mes
- **Navegación fluida:** Selector de mes para explorar historial

### 💰 Gestión de Presupuestos
- **Establecer límites** por categoría mensualmente
- **Alertas visuales:** 🟢 OK | 🟡 Cerca del límite | 🔴 Excedido
- **Progreso en tiempo real:** Barra de progreso y porcentaje gastado
- **Restablecimiento automático** cada mes

### 🎯 Metas de Ahorro
- **Crear metas personalizadas** con objetivo mensual
- **Seguimiento automático** basado en tu balance (ingresos - gastos)
- **Indicadores visuales:** ✅ Meta lograda | ⚠️ Cerca | 🎯 En camino
- **Barra de progreso** con porcentaje completado

### 📝 Gestión de Transacciones
- **Crear, Editar y Eliminar transacciones** con interfaz intuitiva
- **Registra ingresos y gastos** con categoría, fecha y descripción
- **11+ categorías:** Salario, Comida, Transporte, Vivienda, Servicios, Compras, Entretenimiento, Salud, Educación, Ahorro, Otros
- **Listado con botones de acción:**
  - ✏️ **Editar** - Abre modal para modificar la transacción
  - ✕ **Eliminar** - Elimina la transacción inmediatamente
- **Persistencia automática** en localStorage
- **Modal de edición** reutiliza el mismo formulario de creación

### 📱 Diseño Responsive
- Optimizado para **Desktop, Tablet y Mobile**
- Interfaz intuitiva y moderna con Tailwind CSS
- Navegación por pestañas: Dashboard → Gastos → Presupuesto → Metas

---

## 🛠️ Stack Tecnológico

| Tech | Versión | Propósito |
|------|---------|----------|
| React | 18.3 | Framework UI |
| TypeScript | 5.6 | Tipado estático |
| Vite | 5.1 | Build tool rápido |
| Tailwind CSS | 3.4 | Estilos responsive |
| Recharts | Latest | Gráficos interactivos |
| React Router | v6 | Navegación |
| Playwright | Latest | Testing E2E |
| localStorage | Native | Persistencia de datos |

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js 16+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd budget-demo

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre: **[http://localhost:5173](http://localhost:5173)**

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Vista previa de la build
npm run test     # Tests E2E con Playwright
npm run lint     # Validar código
```

---

## 📂 Estructura del Proyecto

```
budget-demo/
├── src/
│   ├── components/
│   │   ├── MonthPicker.tsx         # Selector de mes
│   │   ├── SummaryCards.tsx        # Tarjetas de resumen
│   │   ├── TransactionForm.tsx     # Formulario (crear/editar)
│   │   ├── TransactionList.tsx     # Listado + botones
│   │   ├── CategoryChart.tsx       # Gráfico de gastos
│   │   ├── BudgetManager.tsx       # Gestión de presupuestos
│   │   ├── GoalsManager.tsx        # Gestión de metas
│   │   ├── NavTabs.tsx             # Navegación
│   │   └── Modal.tsx               # Modal reutilizable
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── GastosPage.tsx
│   │   ├── PresupuestoPage.tsx
│   │   └── MetasPage.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts      # Custom hook de persistencia
│   ├── types/
│   │   ├── transaction.ts
│   │   ├── budget.ts
│   │   └── goal.ts
│   ├── utils/
│   │   ├── date.ts                 # Utilidades de fechas
│   │   ├── money.ts                # Formato de moneda (CRC)
│   │   └── transaction.ts          # Utilidades de transacciones
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── POM/
│   ├── pages/                       # Page Object Model
│   │   ├── dashboard.page.js
│   │   ├── gastos.page.js
│   │   ├── presupuesto.page.js
│   │   ├── metas.page.js
│   │   └── navBar.component.js
│   └── tests/
│       ├── dashboard.smoke.spec.js
│       └── gastos.spec.js
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.cjs
├── playwright.config.js
└── package.json
```

---

## 💡 Cómo Usar

### 📊 Dashboard
1. Visualiza el resumen de ingresos, gastos y balance
2. Observa la comparación con el mes anterior (% cambio)
3. Analiza el gráfico de gastos por categoría
4. Monitorea tus metas de ahorro

### 💸 Registrar un Movimiento (Gastos)
1. Ve a la pestaña **"Gastos"**
2. **Formulario Superior:** Llena los datos (fecha, monto, categoría, nota)
3. Selecciona si es **"Gasto"** o **"Ingreso"**
4. Haz clic en **"Agregar Gasto"** o **"Agregar Ingreso"**
5. La transacción aparece en el listado inferior

### ✏️ Editar una Transacción
1. Ve a la pestaña **"Gastos"**
2. Busca la transacción en el listado inferior
3. Haz clic en el botón **✏️ (Editar)**
4. Se abre un **Modal con el formulario**
5. Los campos están **prerellenados** con los datos anteriores
6. Modifica lo que necesites (monto, categoría, fecha, nota)
7. Haz clic en **"Guardar Cambios"**
8. El modal se cierra y la transacción se actualiza
9. Alternativamente, haz clic en **"Cancelar"** para cerrar sin guardar

### 🗑️ Eliminar una Transacción
1. Ve a la pestaña **"Gastos"**
2. Busca la transacción en el listado
3. Haz clic en el botón **✕ (Eliminar)**
4. La transacción se elimina inmediatamente

### 💰 Gestionar Presupuestos
1. Ve a la pestaña **"Presupuesto"**
2. Haz clic en **"Establecer Límite"**
3. Ingresa el máximo a gastar en esa categoría
4. Observa la barra de progreso mientras gastas
5. Los límites se reinician automáticamente cada mes

### 🎯 Crear una Meta de Ahorro
1. Ve a la pestaña **"Metas"**
2. Ingresa el monto objetivo que deseas ahorrar este mes
3. El sistema calcula tu progreso automáticamente
4. Recibe indicador visual cuando logres la meta ✅

### 📅 Navegar Entre Meses
- Usa los botones **<** y **>** en cualquier sección
- Los datos se actualizan automáticamente

### 🔧 Opciones de Datos
- **Cargar demostración:** Carga datos de ejemplo para explorar
- **Limpiar datos:** Elimina todos los datos y empiezas de cero

---

## 📊 Categorías Disponibles

| Icono | Categoría | Descripción |
|-------|-----------|-------------|
| 💰 | Salario | Ingresos principales |
| 🍔 | Comida | Alimentos y restaurantes |
| 🚗 | Transporte | Combustible, transporte público |
| 🏠 | Vivienda | Renta, mantenimiento |
| 💡 | Servicios | Agua, luz, internet, teléfono |
| 🛍️ | Compras | Ropa, accesorios |
| 🎬 | Entretenimiento | Cine, eventos, ocio |
| 🏥 | Salud | Médicos, medicinas, gym |
| 📚 | Educación | Cursos, libros |
| 💎 | Bonus | Ingresos adicionales |
| 💳 | Ahorro | Transferencias a ahorros |
| 🔄 | Otros | Categoría general |

---

## 🧪 Testing E2E con Playwright

El proyecto incluye tests automatizados para validar funcionalidad crítica.

```bash
npm run test
```

### Casos de Prueba Implementados
- ✅ Navegación entre secciones (Dashboard → Metas)
- ✅ Creación de gastos e ingresos
- ✅ **Edición de transacciones** (actualizar datos)
- ✅ Eliminación de transacciones
- ✅ Persistencia de datos en localStorage
- ✅ Navegación entre meses
- ✅ Validación de límites presupuestarios

### Estructura POM (Page Object Model)
```
POM/
├── pages/
│   ├── dashboard.page.js          # Locators y acciones del Dashboard
│   ├── gastos.page.js             # Locators de sección Gastos
│   ├── presupuesto.page.js        # Locators de Presupuestos
│   ├── metas.page.js              # Locators de Metas
│   └── navBar.component.js        # Locators de navegación
└── tests/
    ├── dashboard.smoke.spec.js    # Test de flujo completo
    └── gastos.spec.js             # Test de creación/edición/eliminación
```

---

## 🎓 Aprendizajes Clave

Este proyecto demuestra:

✅ **Arquitectura Limpia**
- Componentes reutilizables y modulares
- Separación clara de responsabilidades
- Custom hooks para lógica compartida

✅ **TypeScript**
- Interfaces tipadas para seguridad
- Configuración strict

✅ **Gestión de Estado**
- Persistencia con localStorage
- useLocalStorage custom hook
- useState para estado local
- useMemo para optimización

✅ **Modal Reutilizable**
- Componente Modal genérico
- Uso en edición de transacciones
- Fácil de extender para otros usos

✅ **Formularios Dinámicos**
- Mismo componente (`TransactionForm`) para crear y editar
- Prop `mode` controla el comportamiento
- `initialValue` precarga datos
- Validaciones con mensajes de error

✅ **Utilidades Funcionales**
- `updateTransaction()` - Actualiza array sin mutar
- `deleteTransaction()` - Elimina sin mutar
- Funciones puras sin side effects

✅ **UI/UX Moderna**
- Tailwind CSS responsive
- Diseño mobile-first
- Accesibilidad con componentes semánticos
- Botones intuitivos (✏️ editar, ✕ eliminar)

✅ **Testing**
- Tests E2E con Playwright
- Page Object Model pattern
- Validación de flujos críticos

✅ **Mejores Prácticas**
- Componentes funcionales
- Hooks modernos de React
- React Router para navegación
- Manejo de errores
- Código limpio y legible

---

## 🚨 Solución de Problemas

### "La app no inicia"
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "Los datos no se guardan"
- Verifica que localStorage esté habilitado
- DevTools (F12) → Application → Local Storage → Busca `budget-app`

### "El modal no se abre"
- Verifica que `Modal.tsx` exista en `src/components/`
- Comprueba que `isModalOpen` state está siendo actualizado
- Abre Console (F12) y busca errores

### "Gráficos no se muestran"
```bash
npm list recharts
npm install recharts
```

### "Edición no funciona"
1. Haz clic en ✏️ en una transacción
2. Abre Console (F12)
3. Deberías ver logs: `🖱️ Click en editar`, `📝 handleEdit llamado`
4. Si no ves logs, el clic no está llegando

### "Tests E2E fallan"
```bash
npm install -D @playwright/test
npm run test
```

---

## 🤝 Contribuciones

¿Bug o idea para mejorar?
- 🐛 Reporta bugs con detalles
- 💡 Sugiere features con casos de uso
- 🔧 Contribuye con pull requests
- 📝 Mejora la documentación

---

## 📄 Licencia

MIT License - Completamente de código abierto.

---

## 👤 Autor

**Melissa Herrera Rodríguez**

Demo educativo mostrando mejores prácticas en desarrollo web moderno con React, TypeScript, Modal reutilizable y testing E2E.

---

## 🚀 Roadmap

### ✅ Implementado
- [x] Dashboard con resumen mensual
- [x] Gestión de límites presupuestarios
- [x] Sistema de metas de ahorro
- [x] Navegación por pestañas
- [x] Gráficos con Recharts
- [x] Persistencia en localStorage
- [x] Testing E2E con Playwright
- [x] Soporte multimoneda (CRC)
- [x] Comparativa mes anterior
- [x] **Crear transacciones** ✨
- [x] **Editar transacciones con Modal** ✨
- [x] **Eliminar transacciones** ✨
- [x] Validaciones en formulario
- [x] Reutilización de componentes (Modal, Form)

### 🔜 Por Implementar
- [ ] Filtros avanzados (categoría, fecha, rango)
- [ ] Exportar a CSV/PDF
- [ ] Gráficos de tendencias mensuales
- [ ] Sincronización en la nube (Firebase)
- [ ] Notificaciones push
- [ ] App móvil con React Native
- [ ] Soporte multi-usuario
- [ ] Integración con bancos
- [ ] Análisis predictivo de gastos
- [ ] Categorización automática con IA

---

**Disfruta Gestionando tu Presupuesto** 💚

Si te fue útil, dale una ⭐