import { useState } from "react";
import { products } from "./data/products";
import groupByCategory from "./utils/groupByCategory";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import StatsBar from "./components/StatsBar";
import ProductSection from "./components/ProductSection";
import ProductGrid from "./components/ProductGrid";
import EmptyState from "./components/EmptyState";
import Footer from "./components/Footer";
import type { CartItem } from "./types/cart";
export type Theme = "dark" | "light";

export default function App() {
    const [search, setSearch] = useState("");
    const [theme, setTheme] = useState<Theme>("light");
    const [favorites, setFavorites] = useState<number[]>([]);
    const [carts, setCarts] = useState<CartItem[]>([]);

    const normalizedSearch = search.trim().toLowerCase();
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(normalizedSearch)
    );
    const isSearching = normalizedSearch !== "";
    const groupedProducts = groupByCategory(filteredProducts);
    function handleToggleFavourites(productId: number) {
        setFavorites((prevIds) => {
            if (prevIds.includes(productId)) {
                return prevIds.filter((id) => id !== productId)
            } else {
                return [...prevIds, productId]
            }
        })
    }
    function handleAddToCart(productID: number){
        setCarts((cart) =>{
            const currentCart = cart.find((item) => item.product.id === productID);
            if (currentCart === undefined) {
                const currentProduct = products.find((item) => item.id === productID);
                if (!currentProduct) return cart;
                const newCart: CartItem = {product : currentProduct, quantity : 1};
                return [...cart, newCart];
            }
            return cart.map((item) => item.product.id === productID ? { ...item, quantity: item.quantity + 1 } : item);

        })
    }
    return (
        <div className={`${theme === "dark" ? "dark" : ""} min-h-screen flex flex-col`}>
            <Navbar theme={theme} favourites = {favorites} onThemeChange={setTheme} carts={carts}/>
            <main
                id="shop"
                className="flex-1 bg-[#f5f7fa] px-5 pb-8 pt-8 transition-colors dark:bg-slate-950 sm:px-9"
            >
                <SearchBar value={search} onSearchChange={setSearch} />
                <p className="mb-5 mt-3 text-sm text-[#627895] dark:text-slate-400" aria-live="polite">
                    Showing {filteredProducts.length} of {products.length} products
                </p>
                {/* Keep the earlier statistics feature out of search results. */}
                {!isSearching && <StatsBar products={products} />}
                {filteredProducts.length === 0 ? (
                    <EmptyState title="No products found" query={search} />
                ) : isSearching ? (
                    <ProductGrid carts = {carts} handleAddToCart = {handleAddToCart}favourites={favorites} onToggleFavorite={handleToggleFavourites} products={filteredProducts} />
                ) : (
                    <div className="space-y-10">
                        {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                            <ProductSection handleAddToCart={handleAddToCart} carts = {carts}
                            favourites={favorites} onToggleFavorite={handleToggleFavourites}
                                key={category}
                                title={`${category} (${categoryProducts.length})`}
                                products={categoryProducts}
                            />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
