import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-[#dadce0] bg-white/90 px-4 py-4 shadow-sm backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/90 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1a73e8]">
            TeamBoard
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#202124] dark:text-slate-100 sm:text-3xl">
            Welcome back{user ? `, ${user.name}` : "."}
          </h1>
      </div>

        <div className="flex items-center justify-between gap-2 sm:w-auto sm:justify-end">
          <div className="hidden items-center gap-2 rounded-full border border-[#ceead6] bg-[#e6f4ea] px-3 py-2 text-sm font-medium text-[#137333] sm:flex">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#34a853]" />
          <span>Online</span>
        </div>
        <Link
            className="rounded-full border border-[#dadce0] bg-white px-4 py-2.5 text-sm font-semibold text-[#3c4043] shadow-sm transition hover:bg-[#f1f3f4] hover:text-[#1a73e8] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          to="/dashboard"
        >
          Overview
        </Link>
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          className="rounded-full border border-[#dadce0] bg-white px-3 py-2.5 text-sm font-semibold text-[#3c4043] shadow-sm transition hover:bg-[#f1f3f4] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <button
          onClick={logout}
            className="rounded-full bg-[#1a73e8] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#185abc]"
        >
          Logout
        </button>
      </div>
      </div>
    </header>
  );
}
