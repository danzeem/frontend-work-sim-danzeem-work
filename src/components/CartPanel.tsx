import EmptyCart from "./EmptyCart";
import CurrentCartItem from './currentCartItem';
import type { CartItem } from "../types/cart";
type CartPanelProps = {
    isClose: boolean;
    itemCount: number;
    onClose: (isClose: boolean) => void;
    carts: CartItem[];
    handleAddToCart: (productID: number) => void;
        removeOneFromCart: (productID: number) => void;
    removeCompletelyFromCart: (productID: number) => void;


}
export default function CartPanel({ itemCount, onClose, isClose, carts, handleAddToCart,removeCompletelyFromCart, removeOneFromCart }: CartPanelProps) {
    function toClose() {
        onClose(isClose ? false : true);
    }

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/40" />
            <div className="fixed bg-white flex flex-col right-0 top-0 h-full w-96 z-50">
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
                    <h2 className="text-lg font-bold tracking-tight text-slate-900">
                        Your cart ({itemCount})
                    </h2>
                    <button
                        type="button"
                        onClick={toClose}
                        aria-label="Close cart"
                        className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 5l10 10M15 5L5 15"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {itemCount === 0 ? (
                        <EmptyCart />
                    ) : (
                        carts.map((cart) => (
                            <CurrentCartItem
                                key={cart.product.id}
                                handleAddToCart={handleAddToCart}
                                carts={carts}
                                product={cart.product}
                                quantity={cart.quantity}
                                removeCompletelyFromCart={removeCompletelyFromCart}
                                removeOneFromCart={removeOneFromCart}
                            />
                        ))
                    )}
                </div>
                <div></div>
            </div>
        </>
    );
}