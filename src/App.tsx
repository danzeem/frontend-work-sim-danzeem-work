import { useEffect, useState } from "react";
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
import CartPanel from "./components/CartPanel";
import type { Product } from "./types/product";

type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

export default function App() {
    // initialize state for products
    // loading and error state is used during the fetch calls
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // below is anything related to the normal webpage after sucessfully reached
    const [search, setSearch] = useState("");
    const [theme, setTheme] = useState<Theme>("light");
    const [favorites, setFavorites] = useState<number[]>([]);
    const [carts, setCarts] = useState<CartItem[]>([]);
    const [close, setClose] = useState<boolean>(true);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data: ProductsResponse = await response.json();
                setProducts(data.products);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred');
                }

            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);


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
    const cPanel = (<CartPanel handleAddToCart={handleAddToCart} removeCompletelyFromCart={removeCompletelyFromCart}
        removeOneFromCart={removeOneFromCart} carts={carts} isClose={close} onClose={setClose} itemCount={carts.length} />);
    function handleAddToCart(productID: number) {
        setCarts((cart) => {
            const currentCart = cart.find((item) => item.product.id === productID);
            if (currentCart === undefined) {
                const currentProduct = products.find((item) => item.id === productID);
                if (!currentProduct) return cart;
                const newCart: CartItem = { product: currentProduct, quantity: 1 };
                return [...cart, newCart];
            }
            return cart.map((item) => item.product.id === productID ? { ...item, quantity: item.quantity + 1 } : item);

        })
    }
    function removeCompletelyFromCart(productID: number) {
        setCarts((cart) => {
            return cart.filter((item) => item.product.id !== productID);

        })

    }
    function removeOneFromCart(productID: number) {
        setCarts((cart) => {
            const currentCart = cart.find((item) => item.product.id === productID);
            if (currentCart === undefined) {
                return cart;
            }else{
                if(currentCart.quantity < 1){
                    return cart.filter((item) => item.product.id !== productID);
               }
            }
            return cart.map((item) => item.product.id === productID ? { ...item, quantity: item.quantity - 1 } : item);
        })

    }

    return (

        <div className={`${theme === "dark" ? "dark" : ""} min-h-screen flex flex-col`}>
            <Navbar theme={theme} favourites={favorites} isClose={close} onClose={setClose} onThemeChange={setTheme} carts={carts} />
            {close ? undefined : cPanel}
            <main
                id="shop"
                className="flex-1 bg-[#f5f7fa] px-5 pb-8 pt-8 transition-colors dark:bg-slate-950 sm:px-9"
            >
                <SearchBar value={search} onSearchChange={setSearch} />
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        <p className="mb-5 mt-3 text-sm text-[#627895] dark:text-slate-400" aria-live="polite">
                            Showing {filteredProducts.length} of {products.length} products
                        </p>
                        {!isSearching && <StatsBar products={products} />}
                        {filteredProducts.length === 0 ? (
                            <EmptyState title="No products found" query={search} />
                        ) : isSearching ? (
                            <ProductGrid carts={carts} handleAddToCart={handleAddToCart} favourites={favorites} onToggleFavorite={handleToggleFavourites} products={filteredProducts} />
                        ) : (
                            <div className="space-y-10">
                                {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                                    <ProductSection
                                        handleAddToCart={handleAddToCart}
                                        carts={carts}
                                        favourites={favorites}
                                        onToggleFavorite={handleToggleFavourites}
                                        key={category}
                                        title={`${category} (${categoryProducts.length})`}
                                        products={categoryProducts}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}
