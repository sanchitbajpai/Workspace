import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { createProjectApi, getProjectsApi } from "../api/project.api";
import { getOrganizationsApi } from "../api/organization.api";
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

type Organization = {
  _id: string;
  name: string;
};

type ApiError = {
  message?: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [organizationId, setOrganizationId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [projectResponse, organizationResponse] = await Promise.all([
          getProjectsApi(),
          getOrganizationsApi(),
        ]);
        const loadedOrganizations = organizationResponse.data.data || [];

        setProjects(projectResponse.data.data || []);
        setOrganizations(loadedOrganizations);
        setOrganizationId(loadedOrganizations[0]?._id || "");
      } catch {
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleCreate = async () => {
    if (!name.trim() || !organizationId) return;
    setCreating(true);
    setError("");

    try {
      const response = await createProjectApi({
        name: name.trim(),
        description: description.trim(),
        organizationId,
      });
      if (response.data.success) {
        toast.success("Project created");
        setProjects((prev) => [response.data.data, ...prev]);
        setName("");
        setDescription("");
      }
    } catch (error) {
      const requestError = error as AxiosError<ApiError>;
      setError(
        requestError.response?.data?.message || "Unable to create project."
      );
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#dadce0] dark:bg-slate-900 dark:ring-slate-800 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1a73e8]">
              Projects
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#202124] dark:text-slate-100">
              Build and organize your work
            </h2>
            <p className="mt-3 text-sm text-[#5f6368] dark:text-slate-400">
              Create a new project, add a description, and keep your team aligned on the next sprint.
            </p>
          </div>
          <div className="grid w-full gap-3 sm:grid-cols-[1fr_1fr_auto] xl:w-[48rem]">
            <select
              value={organizationId}
              onChange={(event) => setOrganizationId(event.target.value)}
              className="rounded-2xl border border-[#dadce0] bg-white px-4 py-3 text-sm text-[#202124] outline-none transition focus:border-[#4285f4] focus:ring-4 focus:ring-[#d2e3fc] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-500/20"
            >
              <option value="">Select organization</option>
              {organizations.map((organization) => (
                <option key={organization._id} value={organization._id}>
                  {organization.name}
                </option>
              ))}
            </select>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Project name"
              className="rounded-2xl border border-[#dadce0] bg-white px-4 py-3 text-sm text-[#202124] outline-none transition focus:border-[#4285f4] focus:ring-4 focus:ring-[#d2e3fc] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-500/20"
            />
            <button
              onClick={handleCreate}
              disabled={creating || !organizationId}
              className="rounded-full bg-[#1a73e8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#185abc] disabled:cursor-not-allowed disabled:bg-[#9aa0a6]"
            >
              {creating ? "Saving..." : "Create project"}
            </button>
          </div>
        </div>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add a short project summary"
          className="mt-5 min-h-[130px] w-full rounded-2xl border border-[#dadce0] bg-white px-4 py-4 text-sm text-[#202124] outline-none transition focus:border-[#4285f4] focus:ring-4 focus:ring-[#d2e3fc] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-500/20"
        />
      </section>

      {error && <ErrorMessage message={error} />}

      {!organizations.length && (
        <ErrorMessage message="Create an organization first, then you can create projects inside it." />
      )}

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
