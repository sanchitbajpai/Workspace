export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-[#fad2cf] bg-[#fce8e6] px-5 py-4 text-sm font-medium text-[#c5221f] shadow-sm dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
      {message}
    </div>
  );
}
