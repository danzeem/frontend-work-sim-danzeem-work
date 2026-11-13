import { useEffect, useState } from "react";
import groupByCategory from "./utils/groupByCategory";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type { CartItem } from "./types/cart";
export type Theme = "dark" | "light";
import CartPanel from "./components/CartPanel";
import type { Product } from "./types/product";
import PromoBanner from "./components/PromoBanner";

import { Routes, Route, useLocation } from "react-router-dom";
import FavoritesPage from "./components/FavouritePage";
import CartPage from "./components/CartPage";
import HomePage from "./components/HomePage";
import ProductDetailPage from "./components/ProductDetailPage";
import NotFoundPage from "./components/NotFoundPage";
import Layout from "./components/Layout";
type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};
const messages = [
    "🚚 Free shipping on orders over $50",
    "🎉 Get 10% off your first order",
    "⭐ Discover our bestselling products"
];


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
    const [index, setIndex] = useState(0);
    const [isVisible, setVisible] = useState(true);

    const cartCount = carts.reduce(
        (total, item) => total + item.quantity,
        0
    );

    useEffect(() => {
        document.title = cartCount === 0 ? `SummitGear Market` : `SummitGear Market (${carts.length})`;
    }, [cartCount])
    useEffect(() => {
        if (!isVisible) return;
        const intervalId = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 4000);

        return () => clearInterval(intervalId);
    }, [])

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
    function closeBanner() {
        setVisible((prev) => false);
    }
    function handleRetry() {
        window.location.reload()
    }
    function handleToggleFavourites(productId: number) {
        setFavorites((prevIds) => {
            if (prevIds.includes(productId)) {
                return prevIds.filter((id) => id !== productId)
            } else {
                return [...prevIds, productId]
            }
        })
    }
    // const cPanel = (<CartPanel handleAddToCart={handleAddToCart} removeCompletelyFromCart={removeCompletelyFromCart}
    //     removeOneFromCart={removeOneFromCart} carts={carts} isClose={close} onClose={setClose} itemCount={carts.length} />);
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
            } else {
                if (currentCart.quantity <= 1) {
                    return cart.filter((item) => item.product.id !== productID);
                }
            }
            return cart.map((item) => item.product.id === productID ? { ...item, quantity: item.quantity - 1 } : item);
        })

    }
    const currentPromoBanner = <PromoBanner message={messages[index]} handleClear={closeBanner} />;
    const currentLocation = useLocation();
    return (
        <div className={`${theme === "dark" ? "dark" : ""} min-h-screen flex flex-col`}>

            <Routes>
                <Route element = {<Layout theme={theme} favourites={favorites} isClose={close} onClose={setClose} onThemeChange={setTheme} 
                carts={carts} message={messages[index]} handleClear={closeBanner} isVisible={isVisible} />}>
                    <Route
                        path="/"
                        element={
                            <HomePage
                                products={products}
                                search={search}
                                onSearchChange={setSearch}
                                carts={carts}
                                favorites={favorites}
                                onAddToCart={handleAddToCart}
                                onToggleFavorite={handleToggleFavourites}
                                loading={loading}
                                error={error}
                                onRetry={handleRetry}
                            />
                        }
                    />

                    <Route
                        path="/favorites"
                        element={
                            <FavoritesPage
                                products={products}
                                favorites={favorites}
                                carts={carts}
                                onAddToCart={handleAddToCart}
                                onToggleFavorite={handleToggleFavourites}
                            />
                        }
                    />
                    <Route path="/products/:id" element={
                        <ProductDetailPage products={products}
                            favorites={favorites}
                            handleAddToCart={handleAddToCart}
                            onToggleFavorite={handleToggleFavourites}
                            carts={carts}
                            loading={loading}
                        />} />

                    <Route
                        path="/cart"
                        element={
                            <CartPage
                                carts={carts}
                                onAddToCart={handleAddToCart}
                                onRemoveOne={removeOneFromCart}
                                onRemoveAll={removeCompletelyFromCart}
                            />
                        }
                    />
                    <Route path="*" element={<NotFoundPage pathname={currentLocation.pathname} />}></Route>

                </Route>
            </Routes>

        </div>
    );
}
