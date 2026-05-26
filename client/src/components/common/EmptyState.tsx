export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#dadce0] bg-white px-6 py-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto mb-4 flex h-10 w-24 overflow-hidden rounded-full">
        <span className="flex-1 bg-[#4285f4]" />
        <span className="flex-1 bg-[#ea4335]" />
        <span className="flex-1 bg-[#fbbc04]" />
        <span className="flex-1 bg-[#34a853]" />
      </div>
      <p className="text-base font-medium text-[#5f6368] dark:text-slate-400">{message}</p>
    </div>
  );
}
