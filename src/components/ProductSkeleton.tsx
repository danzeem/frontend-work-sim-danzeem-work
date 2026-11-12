export default function ProductSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading products"
      className="grid grid-cols-2 gap-4 md:grid-cols-4"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white"
        >
          <div className="h-40 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />

          <div className="space-y-2 p-3">
            <div className="h-2 w-2/5 rounded-full bg-slate-200" />
            <div className="h-2 w-4/5 rounded-full bg-slate-200" />
            <div className="h-2 w-1/3 rounded-full bg-slate-200" />
            <div className="h-7 w-full rounded-md bg-slate-200" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading products...</span>
    </div>
  );
}
