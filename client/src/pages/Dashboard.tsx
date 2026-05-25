import { useEffect, useState } from "react";
import { getStats } from "../api/dashboard.api";
import { getProjectsApi } from "../api/project.api";
import StatCard from "../components/dashboard/StatCard";
import ProjectCard from "../components/ProjectCard";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

type Stats = {
  organizations: number;
  projects: number;
  tasks: number;
  completed: number;
};

type Project = {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [statsResponse, projectResponse] = await Promise.all([
          getStats(),
          getProjectsApi(),
        ]);

        setStats(statsResponse.data.data);
        setProjects(projectResponse.data.data || []);
      } catch (err) {
        setError("Unable to load dashboard data. Try again.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-800 px-8 py-10 shadow-lg text-white">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Dashboard Overview</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">Next-level team productivity</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            Monitor your organizations, projects, and task progress from a single professional dashboard.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Active teams</p>
              <p className="mt-3 text-3xl font-semibold">{stats?.organizations ?? 0}</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Tasks completed</p>
              <p className="mt-3 text-3xl font-semibold">{stats?.completed ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Performance</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">Team health</h3>
            </div>
            <span className="rounded-2xl bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700">Stable</span>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Active projects</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{stats?.projects ?? 0}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Open tasks</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{stats?.tasks ?? 0}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-4">
        <StatCard title="Organizations" value={stats?.organizations ?? 0} />
        <StatCard title="Projects" value={stats?.projects ?? 0} />
        <StatCard title="Tasks" value={stats?.tasks ?? 0} />
        <StatCard title="Completed" value={stats?.completed ?? 0} />
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Recent projects</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Latest boards</h2>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            Showing {projects.length} project{projects.length === 1 ? "" : "s"}
          </div>
        </div>

        {projects.length ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <ProjectCard
                key={project._id}
                id={project._id}
                name={project.name}
                description={project.description}
                createdAt={project.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
            No recent projects yet. Create one in Projects to get started.
          </div>
        )}
      </section>
    </div>
  );
}
