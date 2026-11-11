import type { Product } from "../types/product";

type ProductCardProps = { 
    product: Product;
    
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[15px] border border-[#e0e7f0] bg-white shadow-[0_2px_3px_rgba(15,23,42,0.06)] transition-colors dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_2px_12px_rgba(0,0,0,0.22)]">
      <div className="relative aspect-square bg-[#eff4f9] p-8 dark:bg-slate-800">
        {product.stock < 10 && (
          <span className="absolute left-3 top-3 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
            Low Stock
          </span>
        )}
        <img className="h-full w-full object-contain" src={product.thumbnail} alt={product.title} loading="lazy" />
      </div>
      <div className="flex min-h-[85px] flex-1 flex-col justify-between px-4 pb-4 pt-3">
        <h3 className="text-base font-bold leading-snug text-[#17243b] dark:text-slate-100">
          {product.title}
        </h3>
        <div className="mt-3 flex items-end justify-between gap-3">
          <span className="text-lg font-bold leading-none text-[#076047] dark:text-emerald-300">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs leading-none text-[#4d6585] dark:text-slate-400" aria-label={`Rating ${product.rating} out of 5`}>
            ★ {product.rating}
          </span>
        </div>
      </div>
    </article>
  );
}
