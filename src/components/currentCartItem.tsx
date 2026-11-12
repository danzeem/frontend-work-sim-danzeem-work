import type { CartItem } from "../types/cart";
import type { Product } from "../types/product"

type CartType = {
    product: Product;
    quantity: number;
    handleAddToCart: (productID: number) => void;
    removeOneFromCart: (productID: number) => void;
    removeCompletelyFromCart: (productID: number) => void;
    carts : CartItem[]
}
export default function CurrentCartItem({ product, quantity, handleAddToCart,removeOneFromCart,removeCompletelyFromCart, carts}: CartType) {
            const currentQuantity = carts.find(
                    (item) => item.product.id === product.id
                )?.quantity ?? 0;
            const isMaxInCart=currentQuantity >= product.stock;
    return (
        <div className="flex items-start justify-between py-6 gap-4 border-b border-gray-100">
            {/* Product Thumbnail */}
            <div className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden ml-2">
                <img
                    alt={product.brand}
                    src={product.thumbnail}
                    className="w-12 h-12 object-contain"
                />
            </div>

            {/* Product Details & Quantity Stepper */}
            <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-bold text-slate-900 leading-snug">
                    {product.brand}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                    ${product.price} each
                    <span className="text-amber-700 font-semibold"> · max reached</span>
                </p>

                <div className="inline-flex items-center mt-3 border border-gray-200 rounded-md overflow-hidden">
                    <button
                        type="button"
                        onClick = {() => removeOneFromCart(product.id)}
                        className="w-9 h-8 flex items-center justify-center text-slate-700 hover:bg-gray-50 transition-colors"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>
                    <span className="w-10 h-8 flex items-center justify-center text-sm font-bold text-slate-900 border-x border-gray-200">
                        {quantity}
                    </span>
                    <button
                        type="button"
                        disabled = {isMaxInCart}
                        onClick={() => handleAddToCart(product.id)}
                        className="w-9 h-8 flex 
                        items-center justify-center text-gray-300 
                          disabled:bg-slate-200
                          disabled:text-slate-400
                          disabled:cursor-not-allowed
                          disabled:opacity-100"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Line Total & Remove Action */}
            <div className="flex flex-col items-end shrink-0">
                <span className="text-[15px] font-bold text-slate-900">${quantity * product.price}</span>
                <button
                    type="button"
                    onClick={() => removeCompletelyFromCart(product.id)}
                    className="text-xs font-bold text-rose-700 hover:text-rose-800 mt-3 transition-colors">
                    Remove
                </button>
            </div>
        </div>
    )
}
