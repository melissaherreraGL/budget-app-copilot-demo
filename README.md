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
  
### 🎮 Navegación Intuitiva
- **📅 Selector de mes** – Navega entre meses de forma fluida
- **📋 Listado de movimientos** – Visualiza todas tus transacciones con opción de eliminar

### 📊 Visualización de Datos
- **Gráfico de gastos por categoría** – Entiende dónde va tu dinero
- **🏆 Indicadores inteligentes:**
  - Categoría donde más gastaste
  - Top 3 categorías del mes

### 💾 Gestión de Datos
- **Persistencia automática** – Los datos se guardan en localStorage
- **Funciones de utilidad:**
  - Cargar datos de ejemplo (demo rápida)
  - Limpiar todos los datos
- **Sin conexión requerida** – Todo funciona offline

### ➕ Entrada de Datos Flexible
- Registra **ingresos** y **gastos**
- Selecciona **categorías predefinidas**
- Incluye **fecha y descripción** en cada movimiento

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
|-----------|----------|
| **React 18** | Framework UI moderna |
| **Vite** | Build tool rápido y eficiente |
| **TypeScript** | Tipado estático seguro |
| **Tailwind CSS** | Estilos responsive y modernos |
| **Recharts** | Gráficos interactivos y accesibles |
| **localStorage API** | Persistencia de datos en navegador |
| **Playwright** | Testing E2E |

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
src/
├── components/              # Componentes React reutilizables
│   ├── MonthPicker.tsx      # Navegación entre meses
│   ├── SummaryCards.tsx     # Tarjetas de resumen (ingresos, gastos, balance)
│   ├── TransactionForm.tsx  # Formulario para agregar movimientos
│   ├── TransactionList.tsx  # Listado de transacciones
│   └── CategoryChart.tsx    # Gráfico de gastos por categoría
├── hooks/                   # Custom hooks
│   └── useLocalStorage.ts   # Hook para persistencia de datos
├── types/                   # Definiciones TypeScript
│   └── transaction.ts       # Interfaz de transacción
├── utils/                   # Funciones utilitarias
│   ├── date.ts             # Utilidades de fechas
│   └── format.ts           # Utilidades de formato (moneda, etc)
├── App.tsx                  # Componente principal
└── main.tsx                 # Punto de entrada

tests/                        # Tests E2E con Playwright
public/                       # Archivos estáticos
```

### Componentes Principales

| Componente | Responsabilidad |
|-----------|-----------------|
| `MonthPicker` | Selector de mes para filtrar datos |
| `SummaryCards` | Muestra totales de ingresos, gastos y balance |
| `TransactionForm` | Formulario para registrar nuevos movimientos |
| `TransactionList` | Listado con capacidad de eliminar transacciones |
| `CategoryChart` | Gráfico Recharts de gastos por categoría |

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

### Registrar un Gasto
1. Selecciona el mes (si es necesario)
2. Llena el formulario con descripción, monto y categoría
3. Selecciona "Gasto" como tipo
4. Haz clic en "Agregar"

### Filtrar por Mes
- Usa los botones **<** y **>** para navegar entre meses
- Los datos se actualizan automáticamente

### Limpiar Datos
- Haz clic en el botón **"Limpiar datos"** para empezar de nuevo
- O en **"Cargar demostración"** para datos de ejemplo

---

## 🎓 Aprendizajes Clave

Este proyecto demuestra:

- **Custom Hooks**: `useLocalStorage` para abstraer la persistencia
- **TypeScript**: Interfaces tipadas para seguridad
- **Componentes Reutilizables**: Cada componente tiene una responsabilidad clara
- **Tailwind CSS**: Diseño responsive y moderno sin CSS personalizado
- **Hooks Nativos**: `useState`, `useEffect` para lógica de estado
- **Testing**: Validación de flujos críticos con Playwright

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

---

## 📱 Responsividad

La aplicación está completamente optimizada para:
- ✅ **Desktop** (1920px+)
- ✅ **Tablet** (768px - 1024px)
- ✅ **Mobile** (320px - 767px)

Usa Tailwind CSS responsive classes para garantizar vista óptima en todos los dispositivos.

---

## 🎨 Tema y Colores

| Elemento | Color | Uso |
|----------|-------|-----|
| Ingresos | Verde | Números positivos |
| Gastos | Rojo | Números negativos |
| Balance | Azul | Saldo total |
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

- [ ] Exportar datos a CSV
- [ ] Presupuestos mensuales por categoría
- [ ] Metas de ahorro
- [ ] Sincronización en la nube
- [ ] App móvil con React Native
- [ ] Análisis comparativo entre meses
- [ ] Notificaciones de gastos límite

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