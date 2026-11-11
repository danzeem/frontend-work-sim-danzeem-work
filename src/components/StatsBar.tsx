import type { Product } from "../types/product";

export default function StatsBar({ products }: { products: Product[] }) {
    const stockSum = products.reduce((accumulator, currentProduct) => {
        return accumulator + currentProduct.stock;
    }, 0); // 0 is the initialValue
    const priceSum = products.reduce((accumulator, currentProduct) => {
        return accumulator + currentProduct.stock * currentProduct.price;
    }, 0); // 0 is the initialValue

    const ratingAverage = products.reduce((accumulator, currentProduct) => {
        return accumulator + currentProduct.rating;
    }, 0) / products.length; // 0 is the initialValue
    const lowStockSum = products.reduce((accumulator, currentProduct) => {
        let count = 0
        if (currentProduct.stock > 10) {
            count = 1
        }
        return accumulator + count;
    }, 0); // 0 is the initialValue

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 my-6">
            {/* Card 1: Units In Stock */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Units in Stock
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-2">
                    {stockSum.toLocaleString()}
                </p>
            </div>

            {/* Card 2: Inventory Value */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Inventory Value
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-2">
                    ${priceSum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            </div>

            {/* Card 3: Average Rating */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Average Rating
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-2 flex items-center gap-1">
                    <span>★</span> {ratingAverage.toFixed(1)}
                </p>
            </div>

            {/* Card 4: Low Stock */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Low Stock
                </p>
                <p className="text-2xl font-bold text-orange-700 mt-2">
                    {lowStockSum} {lowStockSum === 1 ? 'product' : 'products'}
                </p>
            </div>
        </div>
    )
}