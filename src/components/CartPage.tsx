import type { CartItem } from "../types/cart";

type CartPageProps = {
  carts: CartItem[];
  onAddToCart: (productId: number) => void;
  onRemoveOne: (productId: number) => void;
  onRemoveAll: (productId: number) => void;
};

export default function CartPage({
  carts,
  onAddToCart,
  onRemoveOne,
  onRemoveAll,
}: CartPageProps) {
  const itemCount = carts.reduce((total, item) => total + item.quantity, 0);
  const subtotal = carts.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <main className="flex-1 bg-[#f5f7fa] px-5 py-10 transition-colors dark:bg-slate-950 sm:px-9">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Your cart</h1>
        <p className="mb-6 mt-1 text-sm text-slate-500 dark:text-slate-400">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </p>

        {carts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-3 text-4xl" aria-hidden="true">🛒</div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">Your cart is empty</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add something you love from the shop.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-2 dark:border-slate-700 dark:bg-slate-900 lg:col-span-2">
              {carts.map(({ product, quantity }) => {
                // Use the same stock cap as your existing cart panel if it differs.
                const maxReached = quantity >= product.stock;
                return (
                  <div
                    key={product.id}
                    className="flex gap-4 border-b border-slate-100 py-5 last:border-b-0 dark:border-slate-700"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="font-semibold text-slate-900 dark:text-white">
                          {product.title}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          ${product.price.toFixed(2)} each
                          {maxReached && (
                            <span className="font-semibold text-amber-700"> · max reached</span>
                          )}
                        </p>
                        <div className="mt-2 inline-flex items-center overflow-hidden rounded-lg border border-slate-300 dark:border-slate-600">
                          <button
                            type="button"
                            aria-label={`Remove one ${product.title}`}
                            onClick={() => onRemoveOne(product.id)}
                            className="px-3 py-1 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
                          >
                            −
                          </button>
                          <span className="border-x border-slate-300 px-4 py-1 font-semibold text-slate-900 dark:border-slate-600 dark:text-white">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Add one ${product.title}`}
                            onClick={() => onAddToCart(product.id)}
                            disabled={maxReached}
                            className="px-3 py-1 text-slate-900 hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300 dark:text-white dark:hover:bg-slate-800 dark:disabled:text-slate-600"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          ${(product.price * quantity).toFixed(2)}
                        </p>
                        <button
                          type="button"
                          onClick={() => onRemoveAll(product.id)}
                          className="mt-3 text-sm font-semibold text-rose-600 hover:text-rose-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Subtotal</h2>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
                Shipping &amp; taxes calculated at checkout.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
