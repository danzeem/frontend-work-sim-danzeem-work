import type { Product } from "../types/product";
import ProductGrid from "./ProductGrid";
import EmptyState from "./EmptyState";

interface ProductSectionProps {
    title: string;
    products: Product[];
    favourites: number[];
    onToggleFavorite: (productID: number) => void;

}

export default function ProductSection({ favourites, onToggleFavorite, title, products }: ProductSectionProps) {
    if (products.length === 0) return <EmptyState title={title} />;

    const prettyTitle = title.charAt(0).toUpperCase() + title.slice(1);
    return (
        <section>
            <h2 className="mb-4 text-xl font-bold text-[#17243b] dark:text-slate-100 sm:text-2xl">
                {prettyTitle}
            </h2>
            <ProductGrid favourites={favourites} onToggleFavorite={onToggleFavorite}products={products} />
        </section>
    );
}
