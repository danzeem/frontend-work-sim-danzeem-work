type SearchBarProps = {
  value: string;
  onSearchChange: (value: string) => void;
};

export default function SearchBar({ value, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg" aria-hidden="true">🔍</span>
      <input
        type="text"
        aria-label="Search products"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onSearchChange(e.target.value)}
        className="h-[52px] w-full rounded-[13px] border-2 border-[#076b52] bg-white pl-[54px] pr-4 text-base text-[#16253e] shadow-[0_0_0_4px_#bfedd7] outline-none transition-colors placeholder:text-[#8ba0b5] focus:border-[#075c49] focus:shadow-[0_0_0_4px_#a9e9ca] dark:border-emerald-500 dark:bg-slate-800 dark:text-slate-100 dark:shadow-[0_0_0_4px_#164e3a] dark:placeholder:text-slate-400 dark:focus:border-emerald-400 dark:focus:shadow-[0_0_0_4px_#065f46]"
      />
    </div>
  );
}
