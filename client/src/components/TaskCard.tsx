type TaskCardProps = {
  title: string;
  description?: string;
  status: string;
};

export default function TaskCard({ title, description, status }: TaskCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-semibold text-slate-900">{title}</h4>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
          {status.replace(/_/g, " ")}
        </span>
      </div>
      {description && <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>}
    </div>
  );
}
