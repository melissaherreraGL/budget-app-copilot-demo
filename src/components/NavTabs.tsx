import { NavLink } from "react-router-dom";

const base =
  "px-4 py-2 rounded-xl text-sm font-medium transition-colors";
const inactive =
  "text-slate-600 hover:text-slate-900 hover:bg-slate-100";
const active =
  "text-slate-900 bg-slate-200";

function TabLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${base} ${isActive ? active : inactive}`
      }
      end
    >
      {label}
    </NavLink>
  );
}

export function NavTabs() {
  return (
    <nav
  data-testid="main-nav"
  className="w-full flex flex-wrap gap-2 p-2 bg-white/70 backdrop-blur rounded-2xl shadow-sm border border-slate-200"
>
  <NavLink
    to="/dashboard"
    data-testid="nav-dashboard"
    data-route="dashboard"
    className={({ isActive }) =>
      `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
        isActive
          ? "text-slate-900 bg-slate-200"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      }`
    }
  >
    Dashboard
  </NavLink>

  <NavLink
    to="/gastos"
    data-testid="nav-gastos"
    data-route="gastos"
    className={({ isActive }) =>
      `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
        isActive
          ? "text-slate-900 bg-slate-200"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      }`
    }
  >
    Gastos
  </NavLink>

  <NavLink
    to="/presupuesto"
    data-testid="nav-presupuesto"
    data-route="presupuesto"
    className={({ isActive }) =>
      `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
        isActive
          ? "text-slate-900 bg-slate-200"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      }`
    }
  >
    Presupuesto
  </NavLink>

  <NavLink
    to="/metas"
    data-testid="nav-metas"
    data-route="metas"
    className={({ isActive }) =>
      `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
        isActive
          ? "text-slate-900 bg-slate-200"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      }`
    }
  >
    Metas
  </NavLink>
</nav>

  );
}
