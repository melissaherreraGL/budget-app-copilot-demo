import { NavLink } from "react-router-dom";

const base = "px-4 py-2 rounded-xl text-sm font-medium transition-colors";
const inactive = "text-slate-600 hover:text-slate-900 hover:bg-slate-100";
const active = "text-slate-900 bg-slate-200";

function TabLink({
  to,
  label,
  testId,
  route,
}: {
  to: string;
  label: string;
  testId: string;
  route: string;
}) {
  return (
    <NavLink
      to={to}
      data-testid={testId}
      data-route={route}
      className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
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
      <TabLink to="/dashboard" label="Dashboard" testId="nav-dashboard" route="dashboard" />
      <TabLink to="/gastos" label="Gastos" testId="nav-gastos" route="gastos" />
      <TabLink to="/presupuesto" label="Presupuesto" testId="nav-presupuesto" route="presupuesto" />
      <TabLink to="/metas" label="Metas" testId="nav-metas" route="metas" />
    </nav>
  );
}
