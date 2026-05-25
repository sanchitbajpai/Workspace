export default function Tasks() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Tasks</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Task management coming soon</h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            This workspace will become your hub for task filters, team workload, and sprint planning. For now, manage tasks from the project boards and return here once the task workflow is available.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">What’s next</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">Quick actions</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• Open your project boards to continue task progress</li>
            <li>• Assign team members to tasks and track statuses</li>
            <li>• Visit Projects to create a new board and start planning</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Best practices</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">Stay organized</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Use one project board per initiative and break work into clear lanes. When this page is fully built, it will let you manage everything in one place.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Soon</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">Kanban analytics</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            We’ll add task boards, due dates, filters, and performance metrics here soon to help your team ship faster.
          </p>
        </div>
      </section>
    </div>
  );
}
