import { Link } from "react-router-dom";

type ProjectCardProps = {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
};

export default function ProjectCard({ id, name, description, createdAt }: ProjectCardProps) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#dadce0] transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 dark:ring-slate-800">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1a73e8]">
            Project
          </p>
          <h3 className="mt-2 truncate text-xl font-semibold text-[#202124] dark:text-slate-100">
            {name}
          </h3>
        </div>
        <Link
          to={`/board/${id}`}
          className="shrink-0 rounded-full bg-[#1a73e8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#185abc]"
        >
          Open Board
        </Link>
      </div>
      <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#5f6368] dark:text-slate-400">
        {description || "No description added yet."}
      </p>
      {createdAt && (
        <p className="mt-5 border-t border-[#f1f3f4] pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#80868b] dark:border-slate-800 dark:text-slate-500">
          Created {new Date(createdAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
