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
    <div className="space-y-6">
      <section className="grid gap-5 xl:grid-cols-[1.45fr_0.9fr]">
        <div className="overflow-hidden rounded-3xl bg-white px-6 py-7 shadow-sm ring-1 ring-[#dadce0] dark:bg-slate-900 dark:ring-slate-800 sm:px-8 sm:py-9">
          <div className="mb-6 flex gap-2">
            <span className="h-2.5 w-10 rounded-full bg-[#4285f4]" />
            <span className="h-2.5 w-10 rounded-full bg-[#ea4335]" />
            <span className="h-2.5 w-10 rounded-full bg-[#fbbc04]" />
            <span className="h-2.5 w-10 rounded-full bg-[#34a853]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1a73e8]">Dashboard Overview</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-[#202124] dark:text-slate-100 sm:text-4xl">Next-level team productivity</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#5f6368] dark:text-slate-400">
            Monitor your organizations, projects, and task progress from a single professional dashboard.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#d2e3fc] bg-[#e8f0fe] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1967d2]">Active teams</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-[#202124]">{stats?.organizations ?? 0}</p>
            </div>
            <div className="rounded-2xl border border-[#ceead6] bg-[#e6f4ea] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#137333]">Tasks completed</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-[#202124]">{stats?.completed ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#dadce0] dark:bg-slate-900 dark:ring-slate-800">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5f6368] dark:text-slate-400">Performance</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#202124] dark:text-slate-100">Team health</h3>
            </div>
            <span className="rounded-full bg-[#e6f4ea] px-3 py-1.5 text-sm font-semibold text-[#137333] ring-1 ring-[#ceead6]">Stable</span>
          </div>

          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl border border-[#feefc3] bg-[#fef7e0] p-4">
              <p className="text-sm text-[#5f6368]">Active projects</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-[#202124]">{stats?.projects ?? 0}</p>
            </div>
            <div className="rounded-2xl border border-[#fad2cf] bg-[#fce8e6] p-4">
              <p className="text-sm text-[#5f6368]">Open tasks</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-[#202124]">{stats?.tasks ?? 0}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Organizations" value={stats?.organizations ?? 0} />
        <StatCard title="Projects" value={stats?.projects ?? 0} />
        <StatCard title="Tasks" value={stats?.tasks ?? 0} />
        <StatCard title="Completed" value={stats?.completed ?? 0} />
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#dadce0] dark:bg-slate-900 dark:ring-slate-800 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1a73e8]">Recent projects</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#202124] dark:text-slate-100">Latest boards</h2>
          </div>
          <div className="rounded-full border border-[#dadce0] bg-[#f8fafd] px-4 py-2.5 text-sm font-medium text-[#3c4043] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
            Showing {projects.length} project{projects.length === 1 ? "" : "s"}
          </div>
        </div>

        {projects.length ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
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
          <div className="mt-5 rounded-2xl border border-dashed border-[#dadce0] bg-[#f8fafd] p-8 text-center text-[#5f6368] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
            No recent projects yet. Create one in Projects to get started.
          </div>
        )}
      </section>
    </div>
  );
}
