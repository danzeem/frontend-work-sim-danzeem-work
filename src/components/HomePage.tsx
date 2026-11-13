import groupByCategory from "../utils/groupByCategory";
import SearchBar from "../components/SearchBar";
import StatsBar from "../components/StatsBar";
import ProductGrid from "../components/ProductGrid";
import ProductSection from "../components/ProductSection";
import EmptyState from "../components/EmptyState";
import ProductSkeleton from "../components/ProductSkeleton";
import ErrorState from "../components/Error";
import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

type HomePageProps = {
    products: Product[];
    search: string;
    onSearchChange: (value: string) => void;
    carts: CartItem[];
    favorites: number[];
    onAddToCart: (productId: number) => void;
    onToggleFavorite: (productId: number) => void;
    loading: boolean;
    error: string | null;
    onRetry: () => void;
};

export default function HomePage({
    products,
    search,
    onSearchChange,
    carts,
    favorites,
    onAddToCart,
    onToggleFavorite,
    loading,
    error,
    onRetry,
}: HomePageProps) {
    const normalizedSearch = search.trim().toLowerCase();
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(normalizedSearch)
    );
    const isSearching = normalizedSearch !== "";
    const groupedProducts = groupByCategory(filteredProducts);

    return (
        <main className="flex-1 bg-[#f5f7fa] px-5 pb-8 pt-8 transition-colors dark:bg-slate-950 sm:px-9">
            <SearchBar value={search} onSearchChange={onSearchChange} />

            {loading ? (
                <ProductSkeleton />
            ) : error ? (
                <ErrorState onRetry={onRetry} />
            ) : (
                <>
                    <p className="mb-5 mt-3 text-sm text-[#627895] dark:text-slate-400" aria-live="polite">
                        Showing {filteredProducts.length} of {products.length} products
                    </p>

                    {!isSearching && <StatsBar products={products} />}

                    {filteredProducts.length === 0 ? (
                        <EmptyState title="No products found" query={search} />
                    ) : isSearching ? (
                        <ProductGrid
                            carts={carts}
                            handleAddToCart={onAddToCart}
                            favourites={favorites}
                            onToggleFavorite={onToggleFavorite}
                            products={filteredProducts}
                        />
                    ) : (
                        <div className="space-y-10">
                            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                                <ProductSection
                                    key={category}
                                    title={`${category} (${categoryProducts.length})`}
                                    products={categoryProducts}
                                    carts={carts}
                                    handleAddToCart={onAddToCart}
                                    favourites={favorites}
                                    onToggleFavorite={onToggleFavorite}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </main>
    );
}
