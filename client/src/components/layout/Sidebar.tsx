import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  { label: "Dashboard", to: "/dashboard", marker: "D" },
  { label: "Organizations", to: "/organizations", marker: "O" },
  { label: "Projects", to: "/projects", marker: "P" },
  { label: "Tasks", to: "/tasks", marker: "T" },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="border-b border-[#dadce0] bg-white text-[#3c4043] transition-colors dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-72 lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r">
      <div className="px-4 py-5 sm:px-6 lg:px-5 lg:py-6">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e8f0fe] text-sm font-black text-[#1a73e8] shadow-sm ring-1 ring-[#d2e3fc]">
            TB
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1a73e8]">
              TeamBoard
            </div>
            <p className="text-lg font-semibold tracking-tight text-[#202124] dark:text-slate-100">Workspace</p>
          </div>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-4 sm:px-6 lg:flex-1 lg:flex-col lg:overflow-visible lg:px-4 lg:pb-0">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex min-w-fit items-center gap-3 rounded-full px-3 py-2.5 text-sm font-semibold transition lg:w-full ${
                isActive
                  ? "bg-[#e8f0fe] text-[#1967d2] dark:bg-blue-500/15 dark:text-blue-300"
                  : "text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#202124] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
              }`
            }
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-bold text-[#1a73e8] shadow-sm ring-1 ring-[#dadce0] dark:bg-slate-900 dark:ring-slate-700">
              {item.marker}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="hidden border-t border-[#dadce0] p-4 dark:border-slate-800 lg:block">
        <button
          onClick={logout}
          className="w-full rounded-full border border-[#dadce0] bg-white px-4 py-2.5 text-sm font-semibold text-[#3c4043] transition hover:bg-[#fce8e6] hover:text-[#c5221f] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-red-500/10 dark:hover:text-red-300"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
