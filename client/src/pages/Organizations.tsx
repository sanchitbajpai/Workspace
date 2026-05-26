import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createOrganizationApi, getOrganizationsApi } from "../api/organization.api";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";

type Organization = {
  _id: string;
  name: string;
  createdAt: string;
};

export default function Organizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getOrganizationsApi();
        setOrganizations(response.data.data || []);
      } catch {
        setError("Unable to load organizations.");
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
      const response = await createOrganizationApi({ name: name.trim() });
      if (response.data.success) {
        toast.success("Organization created");
        setOrganizations((prev) => [response.data.data, ...prev]);
        setName("");
      }
    } catch {
      setError("Unable to create organization.");
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1a73e8]">Organizations</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#202124] dark:text-slate-100">Team directories</h2>
            <p className="mt-3 max-w-2xl text-sm text-[#5f6368] dark:text-slate-400">
              Create and manage the organizations that structure your projects and team collaboration.
            </p>
          </div>
          <div className="grid w-full gap-3 sm:grid-cols-[1fr_auto] xl:w-auto">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Organization name"
              className="rounded-2xl border border-[#dadce0] bg-white px-4 py-3 text-sm text-[#202124] outline-none transition focus:border-[#4285f4] focus:ring-4 focus:ring-[#d2e3fc] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-500/20"
            />
            <button
              onClick={handleCreate}
              disabled={creating}
              className="rounded-full bg-[#1a73e8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#185abc] disabled:cursor-not-allowed disabled:bg-[#9aa0a6]"
            >
              {creating ? "Creating..." : "New organization"}
            </button>
          </div>
        </div>
      </section>

      {error && <ErrorMessage message={error} />}

      {organizations.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {organizations.map((organization) => (
            <div key={organization._id} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#dadce0] transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 dark:ring-slate-800">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1a73e8]">Organization</p>
                <span className="rounded-full bg-[#e6f4ea] px-3 py-1 text-xs font-semibold uppercase text-[#137333] ring-1 ring-[#ceead6]">Active</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#202124] dark:text-slate-100">{organization.name}</h3>
              <p className="mt-3 text-sm text-[#5f6368] dark:text-slate-400">Created {new Date(organization.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No organizations yet. Create one to get started." />
      )}
    </div>
  );
}
