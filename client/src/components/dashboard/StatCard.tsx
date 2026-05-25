export default function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
