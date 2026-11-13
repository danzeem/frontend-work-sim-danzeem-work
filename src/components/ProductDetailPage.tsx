import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import '../styles/style.css';
import { useParams } from "react-router";
import type { CartItem } from "../types/cart";

type ProductDetailPageProps = {
    products: Product[];
    favorites: number[];
    onToggleFavorite: (productID: number) => void;
    handleAddToCart: (productID: number) => void;
    carts: CartItem[];
    loading: boolean;
}


export default function ProductDetailPage({ products, favorites, onToggleFavorite, handleAddToCart, carts, loading }: ProductDetailPageProps) {
    let params = useParams();
    const productID = params.id;
    const product = products.find((product) => String(product.id) === productID);
    const backLink = (
        <Link type="button" to="/" className="mb-5 font-bold text-emerald-900 hover:underline">← Back to shop</Link>
    );
    const isFavorite = favorites.some((favorite) => String(favorite) === productID);
    const cart = carts.find((cart) => String(cart.product.id) === productID)
    const cartQuantity = cart ? cart.quantity : 0;
    if (loading) {
        return <p>Loading product...</p>;
    }
    if (!product) {
        return (
            <main className="bg-[#f7f9fc] px-5 pb-[30px] pt-8 sm:px-[34px]">
                {backLink}
                <section role="status" aria-labelledby="not-found-heading" className="flex min-h-[180px] flex-col items-center justify-center rounded-[15px] border border-rose-200 bg-[#fff0f2] px-4 py-8 text-center text-rose-800">
                    <span className="mb-2 text-[33px] leading-none" aria-hidden="true">🔎</span>
                    <h1 id="not-found-heading" className="mb-1 text-base font-bold">Product not found</h1>
                    <p className="text-[15px]">We couldn't find a product with id {productID}.</p>
                </section>
            </main>
        );
    }

    const atLimit = cartQuantity >= product.stock;
    return (
        <main className="product-page">
            {backLink}

            <section className="product-layout" aria-label="Product details">
                <div className="product-image-card">
                    <img className="product-image" src={product.thumbnail} alt={product.title} />
                </div>

                <div className="product-information">
                    <p className="product-brand">{product.brand}</p>
                    <h1>{product.title}</h1>

                    <div className="product-badges">
                        <span className="badge badge-neutral">{product.category}</span>
                        <span className={`badge ${product.stock > 0 ? 'badge-stock' : 'badge-out'}`}>
                            {product.stock > 0 ? `In stock · ${product.stock} left` : 'Out of stock'}
                        </span>
                        <span className="badge badge-neutral">★ {product.rating.toFixed(2)}</span>
                    </div>

                    <p className="product-price">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                    </p>
                    <p className="product-description">{product.description}</p>

                    <div className="product-actions">
                        <button
                            className="add-to-cart"
                            onClick={() => handleAddToCart(product.id)}
                            disabled={product.stock === 0 || atLimit}
                        >
                            {atLimit ? 'Maximum quantity reached' : product.stock === 0 ? 'Out of stock' : 'Add to cart'}
                        </button>
                        <button
                            className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
                            onClick={() => onToggleFavorite(product.id)}
                            aria-pressed={isFavorite}
                        >
                            {isFavorite ? '♥ Favorited' : '♡ Favorite'}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
