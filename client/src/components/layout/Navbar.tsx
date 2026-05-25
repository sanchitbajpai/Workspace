import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">SaaS Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Welcome back{user ? `, ${user.name}` : "."}</h1>
      </div>

      <div className="flex items-center justify-between gap-3 sm:w-auto sm:justify-end">
        <div className="hidden items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-sm sm:flex">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span>Online</span>
        </div>
        <Link
          className="rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          to="/dashboard"
        >
          Overview
        </Link>
        <button
          onClick={logout}
          className="rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/20 transition hover:from-rose-600 hover:via-pink-600 hover:to-fuchsia-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
