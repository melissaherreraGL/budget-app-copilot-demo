# � Budget App – Gestor de Presupuesto Personal

[![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646cff?style=flat&logo=vite)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38b2ac?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Aplicación web moderna y funcional para el manejo integral de tu presupuesto personal. Construida con **React**, **TypeScript** y **Tailwind CSS**, sin necesidad de backend gracias a `localStorage`.

🎯 **Objetivo:** Registra ingresos y gastos, analiza tus patrones de gasto con gráficos interactivos, y mantén tus datos siempre disponibles localmente en tu navegador.

---

### ⚡ Características Rápidas
- 🚀 Carga instantánea con Vite
- 💾 Sin servidor, todo offline
- 📊 Gráficos interactivos
- 📱 Totalmente responsive
- 🔒 Datos privados en tu navegador
- ⚙️ Tipado completo con TypeScript

---

## ✨ Características Principales

### 📊 Análisis Financiero
- **🧮 Resumen mensual en tiempo real:**
  - Total de ingresos
  - Total de gastos
  - Balance neto (saldo disponible)
  - Gasto por categoría
  
### 🎮 Navegación Intuitiva
- **📅 Selector de mes** – Navega entre meses de forma fluida
- **📋 Listado de movimientos** – Visualiza todas tus transacciones con opción de eliminar
- **🗂️ Pestañas de navegación** – Acceso rápido a todas las secciones

### 📊 Visualización de Datos
- **Gráfico de gastos por categoría** – Entiende dónde va tu dinero
- **🏆 Indicadores inteligentes:**
  - Categoría donde más gastaste
  - Top 3 categorías del mes

### 💰 Gestión Presupuestaria (NUEVO)
- **📈 Establecer límites presupuestarios** por categoría
- **⚠️ Alertas visuales** cuando te acercas al límite
- **📊 Progreso mensual** por categoría
- **🔄 Restablecimiento automático** al cambiar de mes

### 🎯 Metas de Ahorro (NUEVO)
- **🏆 Crear metas personalizadas** con montos objetivo
- **📈 Seguimiento del progreso** en tiempo real
- **🎉 Indicadores de cumplimiento** visuales
- **🗑️ Gestión de metas** (crear, editar, eliminar)

### 💾 Gestión de Datos
- **Persistencia automática** – Los datos se guardan en localStorage
- **Funciones de utilidad:**
  - Cargar datos de ejemplo (demo rápida)
  - Limpiar todos los datos
- **Sin conexión requerida** – Todo funciona offline

### ➕ Entrada de Datos Flexible
- Registra **ingresos** y **gastos**
- Selecciona **11+ categorías predefinidas** (Salario, Comida, Transporte, etc.)
- Incluye **fecha y descripción** en cada movimiento
- **Moneda soportada**: Colones costarricenses (CRC)

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 18.3 | Framework UI moderna |
| **Vite** | 5.1 | Build tool rápido y eficiente |
| **TypeScript** | 5.6 | Tipado estático seguro |
| **Tailwind CSS** | 3.4 | Estilos responsive y modernos |
| **Recharts** | Latest | Gráficos interactivos y accesibles |
| **React Router** | v6 | Navegación multi-página |
| **localStorage API** | Native | Persistencia de datos en navegador |
| **Playwright** | Latest | Testing E2E |

---

## 🎯 Objetivo del Proyecto

Este proyecto demuestra:

- ✅ Arquitectura limpia con componentes React reutilizables
- ✅ TypeScript para código seguro y mantenible
- ✅ UI moderna y responsive con Tailwind CSS
- ✅ Gestión de estado simple y efectiva con hooks
- ✅ Persistencia de datos sin backend
- ✅ Testing end-to-end con Playwright
- ✅ Mejores prácticas en desarrollo web moderno

---

## 🚀 Inicio Rápido

### Requisitos Previos
- **Node.js** 16+ 
- **npm** o **yarn**

### Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd budget-demo

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre tu navegador en: **[http://localhost:5173](http://localhost:5173)** ✨

### Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la app para producción
npm run preview  # Vista previa de la build
npm run test     # Ejecuta tests con Playwright
npm run lint     # Valida el código
```

---

## 🧱 Estructura del Proyecto

```
budget-demo/
├── src/
│   ├── components/              # Componentes React reutilizables
│   │   ├── MonthPicker.tsx      # Navegación entre meses
│   │   ├── SummaryCards.tsx     # Tarjetas de resumen (ingresos, gastos, balance)
│   │   ├── TransactionForm.tsx  # Formulario para agregar movimientos
│   │   ├── TransactionList.tsx  # Listado de transacciones
│   │   ├── CategoryChart.tsx    # Gráfico de gastos por categoría
│   │   ├── BudgetManager.tsx    # Gestor de límites presupuestarios
│   │   ├── GoalsManager.tsx     # Gestor de metas de ahorro
│   │   ├── NavTabs.tsx          # Navegación entre secciones
│   │   └── Modal.tsx            # Componente modal reutilizable
│   ├── pages/                   # Páginas de la aplicación
│   │   ├── DashboardPage.tsx    # Dashboard principal
│   │   ├── GastosPage.tsx       # Página de gestión de gastos
│   │   ├── PresupuestoPage.tsx  # Página de presupuestos
│   │   └── MetasPage.tsx        # Página de metas de ahorro
│   ├── hooks/                   # Custom hooks
│   │   └── useLocalStorage.ts   # Hook para persistencia de datos
│   ├── types/                   # Definiciones TypeScript
│   │   ├── transaction.ts       # Interfaz de transacción
│   │   ├── budget.ts            # Interfaz de presupuesto
│   │   └── goal.ts              # Interfaz de meta
│   ├── utils/                   # Funciones utilitarias
│   │   ├── date.ts             # Utilidades de fechas
│   │   ├── format.ts           # Utilidades de formato
│   │   └── money.ts            # Utilidades de moneda (CRC)
│   ├── assets/                  # Recursos estáticos
│   ├── App.tsx                  # Componente principal con routing
│   ├── App.css                  # Estilos de App
│   ├── index.css                # Estilos globales
│   └── main.tsx                 # Punto de entrada
├── public/                      # Archivos estáticos
├── tests/                       # Tests E2E con Playwright
├── vite.config.ts              # Configuración Vite
├── tsconfig.json               # Configuración TypeScript
├── tailwind.config.cjs         # Configuración Tailwind CSS
├── eslint.config.js            # Configuración ESLint
└── package.json                # Dependencias y scripts
```

### Componentes Principales

| Componente | Responsabilidad |
|-----------|-----------------|
| `MonthPicker` | Selector de mes para filtrar datos |
| `SummaryCards` | Muestra totales de ingresos, gastos y balance |
| `TransactionForm` | Formulario para registrar nuevos movimientos |
| `TransactionList` | Listado con capacidad de eliminar transacciones |
| `CategoryChart` | Gráfico Recharts de gastos por categoría |
| `BudgetManager` | Establece y gestiona límites presupuestarios por categoría |
| `GoalsManager` | Crea y monitorea metas de ahorro |
| `NavTabs` | Navegación por pestañas entre secciones |
| `Modal` | Componente modal reutilizable para diálogos |

### Páginas de la Aplicación

| Página | Propósito | Características |
|--------|-----------|-----------------|
| `DashboardPage` | Vista general del presupuesto | Resumen, gráficos, indicadores |
| `GastosPage` | Gestión completa de transacciones | Formulario, listado, eliminación |
| `PresupuestoPage` | Configuración y monitoreo de presupuestos | Establecer límites, alertas, progreso |
| `MetasPage` | Creación y seguimiento de metas de ahorro | Crear metas, seguimiento, progreso |

### Tipos de Datos

| Tipo | Contenido |
|------|-----------|
| `Transaction` | Movimiento (ingreso/gasto) con categoría |
| `BudgetLimit` | Límite presupuestario por categoría |
| `Goal` | Meta de ahorro con progreso |

---

## � Testing

El proyecto incluye tests E2E con **Playwright** para validar funcionalidad crítica.

```bash
npm run test
```

### Casos de Prueba
- ✅ Agregar gastos e ingresos
- ✅ Eliminación de transacciones
- ✅ Persistencia de datos en localStorage
- ✅ Navegación entre meses

---

## 💡 Cómo Usar

### 📊 Dashboard Principal
1. Abre la aplicación y verás el dashboard con resumen de ingresos/gastos
2. Usa el selector de mes para ver datos de diferentes períodos
3. Visualiza el gráfico de gastos por categoría

### Registrar un Gasto
1. Ve a la pestaña **"Gastos"**
2. Llena el formulario con descripción, monto y categoría
3. Selecciona **"Gasto"** como tipo (o "Ingreso" según corresponda)
4. Haz clic en **"Agregar"**

### 💰 Gestionar Presupuestos
1. Ve a la pestaña **"Presupuesto"**
2. Haz clic en **"Establecer Límite"** para una categoría
3. Ingresa el monto máximo mensual
4. El sistema muestra tu progreso y alerta si te acercas al límite
5. Los límites se reinician automáticamente cada mes

### 🎯 Crear Metas de Ahorro
1. Ve a la pestaña **"Metas"**
2. Haz clic en **"Nueva Meta"**
3. Ingresa nombre de la meta y monto objetivo
4. El sistema rastrea tu progreso automáticamente
5. Recibe retroalimentación visual cuando logres la meta

### Filtrar por Mes
- Usa los botones **<** y **>** en cualquier sección para navegar entre meses
- Los datos se actualizan automáticamente

### Limpiar Datos
- Haz clic en el botón **"Limpiar datos"** para empezar de nuevo
- O en **"Cargar demostración"** para datos de ejemplo

---

## 🎓 Aprendizajes Clave

Este proyecto demuestra:

- **Custom Hooks**: `useLocalStorage` para abstraer la persistencia
- **TypeScript**: Interfaces tipadas para seguridad (`Transaction`, `BudgetLimit`, `Goal`)
- **Componentes Reutilizables**: Cada componente tiene una responsabilidad clara
- **Tailwind CSS**: Diseño responsive y moderno sin CSS personalizado
- **Hooks Nativos**: `useState`, `useEffect` para lógica de estado
- **Testing**: Validación de flujos críticos con Playwright
- **React Router**: Navegación multi-página y sincronización de estado
- **Gestión de Estado Global**: Persistencia de datos complejos
- **Patrones de Componentes**: Componentes controlados y no controlados
- **Modales Reutilizables**: Componente Modal para diálogos flexibles
- **Formatos de Moneda**: Manejo de CRC con formato local

---

---

## 📚 Documentación de Componentes

### MonthPicker
```tsx
// Permite navegar entre meses
<MonthPicker currentMonth={month} onMonthChange={setMonth} />
```
- Props: `currentMonth` (Date), `onMonthChange` (function)

### SummaryCards
```tsx
// Muestra totales del mes actual
<SummaryCards transactions={transactions} />
```
- Props: `transactions` (Transaction[])

### TransactionForm
```tsx
// Formulario para agregar nuevos movimientos
<TransactionForm onAddTransaction={handleAdd} />
```
- Props: `onAddTransaction` (function)

### TransactionList
```tsx
// Lista de transacciones con opción de eliminar
<TransactionList transactions={transactions} onDelete={handleDelete} />
```
- Props: `transactions` (Transaction[]), `onDelete` (function)

### CategoryChart
```tsx
// Gráfico de gastos por categoría
<CategoryChart transactions={transactions} />
```
- Props: `transactions` (Transaction[])

### BudgetManager (NUEVO)
```tsx
// Gestiona límites presupuestarios por categoría
<BudgetManager budgets={budgets} onSave={handleSave} />
```
- Props: `budgets` (BudgetLimit[]), `onSave` (function)
- Permite: Establecer, editar y eliminar límites por categoría

### GoalsManager (NUEVO)
```tsx
// Crea y monitorea metas de ahorro
<GoalsManager goals={goals} transactions={transactions} onSave={handleSave} />
```
- Props: `goals` (Goal[]), `transactions` (Transaction[]), `onSave` (function)
- Permite: Crear, editar, eliminar y seguir metas de ahorro

### NavTabs (NUEVO)
```tsx
// Navegación por pestañas entre secciones
<NavTabs currentTab={tab} onTabChange={setTab} />
```
- Props: `currentTab` (string), `onTabChange` (function)
- Tabs: Dashboard, Gastos, Presupuesto, Metas

### Modal (NUEVO)
```tsx
// Componente modal reutilizable
<Modal isOpen={open} onClose={handleClose} title="Título">
  {/* contenido */}
</Modal>
```
- Props: `isOpen` (boolean), `onClose` (function), `title` (string), `children` (React.ReactNode)
---

## 🔧 Configuración del Proyecto

### Vite Config
La configuración está optimizada para desarrollo rápido y build eficiente en [vite.config.ts](vite.config.ts).

### TypeScript
Configuración strict en [tsconfig.json](tsconfig.json) para máxima seguridad de tipos.

### Tailwind CSS
Estilos customizados en [tailwind.config.cjs](tailwind.config.cjs) para tema consistente.

### ESLint
Reglas de linting configuradas en [eslint.config.js](eslint.config.js).

### Routing
La aplicación usa **React Router** para navegación entre páginas:
- `/` - Dashboard principal
- `/gastos` - Gestión de transacciones
- `/presupuesto` - Configuración de presupuestos
- `/metas` - Gestión de metas de ahorro

La navegación se realiza mediante el componente `NavTabs` que sincroniza con la URL.

---

## 📱 Responsividad

La aplicación está completamente optimizada para:
- ✅ **Desktop** (1920px+)
- ✅ **Tablet** (768px - 1024px)
- ✅ **Mobile** (320px - 767px)

Usa Tailwind CSS responsive classes para garantizar vista óptima en todos los dispositivos.

---

---

## 📂 Categorías Disponibles

La aplicación soporta las siguientes categorías de gasto:

| Categoría | Código | Descripción |
|-----------|--------|-------------|
| 💰 Salario | `salary` | Ingresos principales |
| 🍔 Comida | `food` | Alimentos y restaurantes |
| 🚗 Transporte | `transport` | Combustible, transporte público, uber |
| 🏠 Vivienda | `housing` | Renta, hipoteca, mantenimiento |
| 💡 Servicios | `utilities` | Agua, luz, internet, teléfono |
| 🛍️ Compras | `shopping` | Ropa, accesorios, otros artículos |
| 🎬 Entretenimiento | `entertainment` | Cine, eventos, ocio |
| 🏥 Salud | `health` | Médicos, medicinas, gym |
| 📚 Educación | `education` | Cursos, libros, educación |
| 🏦 Ahorro | `savings` | Transferencias a ahorros |
| 📦 Otros | `other` | Gastos no categorizados |

---

## 🎨 Tema y Colores

| Elemento | Color | Uso |
|----------|-------|-----|
| Ingresos | Verde | Números positivos |
| Gastos | Rojo | Números negativos |
| Balance | Azul | Saldo total |
| Alertas | Naranja/Amarillo | Acercarse a límite |
| Éxito | Verde claro | Meta cumplida |
| Fondo | Gris claro | Contraste visual |

---

## 🚨 Solución de Problemas

### "La app no inicia"
```bash
# Solución:
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "Los datos no se guardan"
- Verifica que localStorage esté habilitado en tu navegador
- Abre DevTools (F12) → Application → Local Storage

### "Errores de tipado TypeScript"
```bash
# Compila y verifica errores:
npm run build
```

### "Tests E2E fallan"
```bash
# Reinstala dependencias de Playwright:
npm install
npm run test
```

---

## 🤝 Contribuciones

¿Encontraste un bug o tienes una idea? 
- 🐛 **Reporta bugs** abriendo un issue detallado
- 💡 **Sugiere features** con casos de uso específicos
- 🔧 **Contribuye código** con pull requests bien documentados
- 📝 **Mejora la documentación** si algo no está claro

### Cómo contribuir
1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/tu-feature`
3. Commit cambios: `git commit -m 'Add tu-feature'`
4. Push: `git push origin feature/tu-feature`
5. Abre un Pull Request

---

## 📄 Licencia

MIT License - Este proyecto es completamente de código abierto.
Siéntete libre de usarlo, modificarlo, distribuir y reutilizar en tus proyectos.

---

## 👤 Autor

Creado como demo educativo para mostrar mejores prácticas en desarrollo web moderno.

---

## 🙋 Soporte

Si tienes problemas:
1. ✅ Verifica que tengas **Node.js 16+** instalado (`node --version`)
2. ✅ Borra `node_modules` y cache: `rm -rf node_modules package-lock.json`
3. ✅ Reinstala dependencias: `npm install`
4. ✅ Limpia localStorage: DevTools → Application → Clear All
5. ❓ Abre un issue con detalles del error y tu entorno

---

## 🚀 Próximos Pasos (Ideas)

### ✅ Ya Implementado
- [x] Gestión de límites presupuestarios por categoría
- [x] Sistema de metas de ahorro
- [x] Navegación por pestañas/secciones
- [x] Componente Modal reutilizable
- [x] Múltiples páginas (Dashboard, Gastos, Presupuesto, Metas)
- [x] Soporte para moneda CRC

### 🔜 Por Implementar
- [ ] Exportar datos a CSV/PDF
- [ ] Sincronización en la nube (Firebase)
- [ ] Análisis comparativo entre meses
- [ ] Notificaciones push de gastos límite
- [ ] Gráficos de tendencias mensuales
- [ ] Categorización automática con IA
- [ ] App móvil con React Native
- [ ] Sistema de recibos/facturas
- [ ] Presupuestos compartidos (multi-usuario)
- [ ] Integración con bancos

---

**Gracias por usar Budget App** 💚

Si este proyecto te fue útil, considera darle una ⭐ en GitHub.

## 🙋 Soporte

Si tienes problemas:
1. Verifica que tengas Node.js 16+ instalado
2. Borra `node_modules` y `package-lock.json`, luego ejecuta `npm install`
3. Limpia el cache del navegador (localStorage)
4. Abre un issue con detalles del problema

---

**Gracias por usar Budget App** 🎉
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