# � Budget App – Gestor de Presupuesto Personal

Aplicación web moderna y funcional para el manejo integral de tu presupuesto personal. Construida con **React**, **TypeScript** y **Tailwind CSS**, sin necesidad de backend gracias a `localStorage`.

🎯 **Objetivo:** Registra ingresos y gastos, analiza tus patrones de gasto con gráficos interactivos, y mantén tus datos siempre disponibles localmente en tu navegador.

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

## 🤝 Contribuciones

¿Encontraste un bug o tienes una idea? 
- Abre un issue o pull request
- Mejoras en UI/UX bienvenidas
- Sugerencias para nuevas categorías o funcionalidades

---

## 📄 Licencia

Este proyecto es de código abierto. Siéntete libre de usarlo, modificarlo y compartirlo.

---

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