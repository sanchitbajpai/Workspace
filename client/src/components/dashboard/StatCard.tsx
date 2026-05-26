export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#dadce0] transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 dark:ring-slate-800">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[#5f6368] dark:text-slate-400">{title}</p>
        <span className="h-2.5 w-2.5 rounded-full bg-[#4285f4]" />
      </div>

      <p className="mt-4 text-3xl font-semibold tracking-tight text-[#202124] dark:text-slate-100">
        {value}
      </p>

      <div className="mt-4 h-1.5 rounded-full bg-[#f1f3f4] dark:bg-slate-800">
        <div className="h-full w-2/3 rounded-full bg-[#4285f4]" />
      </div>
    </div>
  );
}
