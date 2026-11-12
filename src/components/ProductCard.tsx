import type { Product } from "../types/product";

type ProductCardProps = {
    product: Product;
    isFavorite: boolean;
    isMaxInCart: boolean;
    onToggleFavorite: (productID: number) => void;
    handleAddToCart: (productID: number) => void;
};

export default function ProductCard({ product, isFavorite, isMaxInCart, handleAddToCart, onToggleFavorite }: ProductCardProps) {
    function handleToggle() {
        onToggleFavorite(product.id);
    }
    function handleCart(){
        handleAddToCart(product.id);
    }
    return (
        <article className="flex h-full flex-col overflow-hidden rounded-[15px] border border-[#e0e7f0] bg-white shadow-[0_2px_3px_rgba(15,23,42,0.06)] transition-colors dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_2px_12px_rgba(0,0,0,0.22)]">
            <div className="relative aspect-square bg-[#eff4f9] p-8 dark:bg-slate-800">
                {product.stock < 10 && (
                    <span className="absolute left-3 top-3 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
                        Low Stock
                    </span>
                )}
                <button
                    onClick={handleToggle}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-base leading-none transition-all ${isFavorite
                        ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/15 dark:text-rose-400"
                        : "border-slate-200 bg-white text-slate-300 hover:border-slate-300 hover:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500 dark:hover:border-slate-600 dark:hover:text-slate-400"
                        }`}
                >
                    {isFavorite ? "♥" : "♡"}
                </button>
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
                <button
                    type="button"
                    disabled={isMaxInCart}
                    onClick={handleCart}
                    className={`
                          w-full rounded-xl px-4 py-3 mt-5
                          text-sm font-semibold
                          transition-colors
                          bg-emerald-800 text-white
                          hover:bg-emerald-900
                          disabled:bg-slate-200
                          disabled:text-slate-400
                          disabled:cursor-not-allowed
                          disabled:opacity-100
                        `}>
                    {isMaxInCart ? "Max in cart" : "Add to cart"}
                </button>
            </div>
        </article>
    );
}
