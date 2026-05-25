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
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Organizations</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Team directories</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Organization name"
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
            <button
              onClick={handleCreate}
              disabled={creating}
              className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-500"
            >
              {creating ? "Creating..." : "Create Organization"}
            </button>
          </div>
        </div>
      </section>

      {error && <ErrorMessage message={error} />}

      {organizations.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {organizations.map((organization) => (
            <div key={organization._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Organization</p>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{organization.name}</h3>
              <p className="mt-3 text-sm text-slate-500">Created {new Date(organization.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No organizations yet. Create one to get started." />
      )}
    </div>
  );
}
