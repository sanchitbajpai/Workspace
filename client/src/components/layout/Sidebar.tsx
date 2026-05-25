import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Organizations", to: "/organizations" },
  { label: "Projects", to: "/projects" },
  { label: "Tasks", to: "/tasks" },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="flex w-80 shrink-0 flex-col bg-slate-950 text-slate-100 shadow-lg">
      <div className="border-b border-slate-800 px-6 py-6">
        <div className="text-xs uppercase tracking-[0.35em] text-slate-500">TeamBoard</div>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-white">Workspace</p>
        <p className="mt-2 max-w-[14rem] text-sm text-slate-400">A modern dashboard for your team, projects, and tasks.</p>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-5">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-3xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-800 text-white shadow-[0_10px_30px_-20px_rgba(15,23,42,0.9)]"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-800 px-6 py-5">
        <button
          onClick={logout}
          className="w-full rounded-3xl bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
