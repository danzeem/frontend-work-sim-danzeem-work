type PromoBannerProps = {
    message : string;
    handleClear : () => void;
}

export default function PromoBanner({message, handleClear}: PromoBannerProps) {
  return (
    <div className="relative flex w-full items-center justify-center bg-emerald-800 px-10 py-3 text-white">

      {/* Promo message */}
      <p className="text-center text-sm font-semibold">
            {message}
      </p>

      {/* Pagination dots */}
      <div className="ml-3 flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-emerald-200" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={handleClear}
        aria-label="Close promotion banner"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-white/80 transition hover:text-white"
      >
        ×
      </button>
    </div>
  );
}
