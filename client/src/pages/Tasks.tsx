export default function Tasks() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#dadce0] dark:bg-slate-900 dark:ring-slate-800 sm:p-8">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1a73e8]">Tasks</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#202124] dark:text-slate-100">Task management coming soon</h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-[#5f6368] dark:text-slate-400">
            This workspace will become your hub for task filters, team workload, and sprint planning. For now, manage tasks from the project boards and return here once the task workflow is available.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-[#d2e3fc] bg-[#e8f0fe] p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1967d2]">What's next</p>
          <h3 className="mt-3 text-xl font-semibold text-[#202124]">Quick actions</h3>
          <ul className="mt-4 space-y-3 text-sm text-[#5f6368]">
            <li>Open your project boards to continue task progress</li>
            <li>Assign team members to tasks and track statuses</li>
            <li>Visit Projects to create a new board and start planning</li>
          </ul>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#dadce0] dark:bg-slate-900 dark:ring-slate-800">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6368]">Best practices</p>
          <h3 className="mt-3 text-xl font-semibold text-[#202124] dark:text-slate-100">Stay organized</h3>
          <p className="mt-3 text-sm leading-7 text-[#5f6368] dark:text-slate-400">
            Use one project board per initiative and break work into clear lanes. When this page is fully built, it will let you manage everything in one place.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#dadce0] dark:bg-slate-900 dark:ring-slate-800">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6368]">Soon</p>
          <h3 className="mt-3 text-xl font-semibold text-[#202124] dark:text-slate-100">Kanban analytics</h3>
          <p className="mt-3 text-sm leading-7 text-[#5f6368] dark:text-slate-400">
            We’ll add task boards, due dates, filters, and performance metrics here soon to help your team ship faster.
          </p>
        </div>
      </section>
    </div>
  );
}
