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
    <aside className="flex w-72 shrink-0 flex-col bg-slate-950 text-slate-100">
      <div className="border-b border-slate-800 px-6 py-5">
        <div className="text-sm uppercase tracking-[0.3em] text-slate-500">TeamBoard</div>
        <p className="mt-3 text-2xl font-semibold">Workspace</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-800 text-white shadow"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-slate-800 px-6 py-5 text-slate-400">
        <button
          onClick={logout}
          className="w-full rounded-xl bg-slate-800 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
