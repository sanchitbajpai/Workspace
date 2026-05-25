import { Link } from "react-router-dom";

type ProjectCardProps = {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
};

export default function ProjectCard({ id, name, description, createdAt }: ProjectCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Project</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{name}</h3>
        </div>
        <Link
          to={`/board/${id}`}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Open board
        </Link>
      </div>
      <p className="mt-4 text-slate-600">{description}</p>
      {createdAt && (
        <p className="mt-4 text-sm text-slate-500">Created {new Date(createdAt).toLocaleDateString()}</p>
      )}
    </div>
  );
}
