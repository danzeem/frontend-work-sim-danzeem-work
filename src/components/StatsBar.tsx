import type { Product } from "../types/product";

type StatsBarProps = { products: Product[] };

export default function StatsBar({ products }: StatsBarProps) {
  const stockSum = products.reduce((sum, product) => sum + product.stock, 0);
  const priceSum = products.reduce((sum, product) => sum + product.stock * product.price, 0);
  const ratingAverage = products.length
    ? products.reduce((sum, product) => sum + product.rating, 0) / products.length
    : 0;
  const lowStockSum = products.reduce((sum, product) => sum + (product.stock < 10 ? 1 : 0), 0);

  const cardClass = "rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900";
  const labelClass = "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400";
  const valueClass = "mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100";

  return (
    <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className={cardClass}>
        <p className={labelClass}>Units in Stock</p>
        <p className={valueClass}>{stockSum.toLocaleString()}</p>
      </div>
      <div className={cardClass}>
        <p className={labelClass}>Inventory Value</p>
        <p className={valueClass}>${priceSum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
      <div className={cardClass}>
        <p className={labelClass}>Average Rating</p>
        <p className={valueClass}>★ {ratingAverage.toFixed(1)}</p>
      </div>
      <div className={cardClass}>
        <p className={labelClass}>Low Stock</p>
        <p className="mt-2 text-2xl font-bold text-orange-700 dark:text-orange-300">
          {lowStockSum} {lowStockSum === 1 ? "product" : "products"}
        </p>
      </div>
    </div>
  );
}
