import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createProjectApi, getProjectsApi } from "../api/project.api";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import ProjectCard from "../components/ProjectCard";

type Project = {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getProjectsApi();
        setProjects(response.data.data || []);
      } catch {
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setCreating(true);
    setError("");

    try {
      const response = await createProjectApi({
        name: name.trim(),
        description: description.trim(),
      });
      if (response.data.success) {
        toast.success("Project created");
        setProjects((prev) => [response.data.data, ...prev]);
        setName("");
        setDescription("");
      }
    } catch {
      setError("Unable to create project.");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Projects</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Build and organize your work</h2>
            <p className="mt-3 text-sm text-slate-600">
              Create a new project, add a description, and keep your team aligned on the next sprint.
            </p>
          </div>
          <div className="grid w-full gap-3 sm:grid-cols-[1fr_auto] xl:w-[42rem]">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Project name"
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
            <button
              onClick={handleCreate}
              disabled={creating}
              className="rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
            >
              {creating ? "Saving..." : "Create project"}
            </button>
          </div>
        </div>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add a short project summary"
          className="mt-5 min-h-[140px] w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        />
      </section>

      {error && <ErrorMessage message={error} />}

      {projects.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
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
        <EmptyState message="No projects yet. Create one to launch your board." />
      )}
    </div>
  );
}
