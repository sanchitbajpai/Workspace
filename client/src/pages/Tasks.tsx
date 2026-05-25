export default function Tasks() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Tasks</p>
          <h2 className="text-2xl font-semibold text-slate-900">Work in progress</h2>
          <p className="max-w-2xl text-slate-600">
            This area is reserved for task-focused views and filters. For now, open any project board from Projects to manage task status.
          </p>
        </div>
      </section>
    </div>
  );
}
