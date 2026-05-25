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
      <section className="grid gap-6 xl:grid-cols-4">
        <StatCard title="Organizations" value={stats?.organizations ?? 0} />
        <StatCard title="Projects" value={stats?.projects ?? 0} />
        <StatCard title="Tasks" value={stats?.tasks ?? 0} />
        <StatCard title="Completed" value={stats?.completed ?? 0} />
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Recent projects</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Your latest workspaces</h2>
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
          <div className="mt-6 text-slate-500">No recent projects yet. Create one in Projects.</div>
        )}
      </section>
    </div>
  );
}
