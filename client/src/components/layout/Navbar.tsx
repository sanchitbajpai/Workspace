import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">SaaS Dashboard</p>
        <h1 className="text-2xl font-semibold text-slate-900">Welcome back{user ? `, ${user.name}` : "."}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Link className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700" to="/dashboard">
          Overview
        </Link>
        <button
          onClick={logout}
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
