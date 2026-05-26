type TaskCardProps = {
  title: string;
  description?: string;
  status: string;
};
const statusStyles = {
  todo: "bg-[#fef7e0] text-[#b06000] ring-[#feefc3]",
  in_progress: "bg-[#e8f0fe] text-[#1967d2] ring-[#d2e3fc]",
  completed: "bg-[#e6f4ea] text-[#137333] ring-[#ceead6]",
};

export default function TaskCard({ title, description, status }: TaskCardProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#dadce0] transition hover:shadow-md dark:bg-slate-900 dark:ring-slate-800">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-semibold text-[#202124] dark:text-slate-100">{title}</h4>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
            statusStyles[status as keyof typeof statusStyles] ??
            "bg-[#f1f3f4] text-[#5f6368] ring-[#dadce0]"
          }`}
        >
          {status.replace(/_/g, " ")}
        </span>
      </div>
      {description && <p className="mt-3 text-sm leading-6 text-[#5f6368] dark:text-slate-400">{description}</p>}
    </div>
  );
}
