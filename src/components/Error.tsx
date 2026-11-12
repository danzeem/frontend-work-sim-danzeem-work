
type ErrorStateProps = {
  onRetry?: () => void;
};

export default function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="w-full rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center"
    >
      <div className="mb-2 text-3xl">
        ⚠️
      </div>

      <h2 className="mb-2 text-base font-bold text-red-700">
        We couldn't load products
      </h2>

      <p className="mb-4 text-sm text-red-700">
        Something went wrong talking to the server.
        Check your connection and try again.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
}
