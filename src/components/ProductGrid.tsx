
import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

type ProductGridProps = {
    products: Product[];
    favourites: number[];
    onToggleFavorite: (productID: number) => void;

};

export default function ProductGrid({ favourites, onToggleFavorite, products }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
                <ProductCard isFavorite={favourites.includes(product.id)} onToggleFavorite={onToggleFavorite} key={product.id} product={product} />
            ))}
        </div>
    );
}
