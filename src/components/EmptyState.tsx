type EmptyStateProps = {
  title: string;
  query?: string;
};

export default function EmptyState({ title, query }: EmptyStateProps) {
  return (
    <section
      className="flex min-h-[178px] w-full flex-col items-center justify-center rounded-[14px] border-2 border-dashed border-[#cfdbeb] bg-white px-5 py-8 text-center transition-colors dark:border-slate-600 dark:bg-slate-900"
      aria-live="polite"
    >
      <span className="mb-2 text-[33px] leading-none" aria-hidden="true">🔍</span>
      <h2 className="text-base font-bold text-[#17243b] dark:text-slate-100">{title}</h2>
      <p className="mt-1 text-sm text-[#627895] dark:text-slate-400">
        {query?.trim()
          ? <>Nothing matches “{query}”. Try a different search.</>
          : "Nothing to match this section. Check back soon!"}
      </p>
    </section>
  );
}
