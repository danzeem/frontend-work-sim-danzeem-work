import type { Theme } from "../App";
import type { CartItem } from "../types/cart";

type NavbarProps = {
    theme: Theme;
    favourites: number[];
    carts: CartItem[];
    onThemeChange: (theme: Theme) => void;
};

export default function Navbar({ favourites, theme, onThemeChange, carts }: NavbarProps) {
    function toggleTheme() {
        onThemeChange(theme === "dark" ? "light" : "dark");
    }
    const currentTotalCart = carts.reduce((acc, curr) => acc + curr.quantity, 0);
    return (
        <header className="border-b border-[#e1e8f0] bg-white transition-colors dark:border-slate-700 dark:bg-slate-900">
            <nav
                className="flex min-h-[66px] w-full items-center justify-between gap-4 px-5 py-4 sm:px-9"
                aria-label="Main navigation"
            >
                <a href="#shop" className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#075c49] text-[11px] text-white dark:bg-emerald-600" aria-hidden="true">
                        ▲
                    </span>
                    <span className="truncate text-base font-extrabold tracking-tight text-[#075c49] dark:text-emerald-300 sm:text-xl">
                        SummitGear Market
                    </span>
                </a>
                <div className="flex shrink-0 items-center gap-3 text-sm text-[#263b59] dark:text-slate-200 sm:gap-8">
                    <a className="hover:text-[#075c49] dark:hover:text-emerald-300" href="#shop">Shop</a>
                    <a className="hover:text-[#075c49] dark:hover:text-emerald-300" href="#favorites">Favorites
                        {favourites.length > 0 && (
                            <span className="inline-flex items-center justify-center rounded-full bg-emerald-900 px-2.5 py-0.5 text-xs font-bold text-white dark:bg-emerald-300 dark:text-slate-900">
                                {favourites.length}
                            </span>)}
                    </a>
                    <a className="hover:text-[#075c49] dark:hover:text-emerald-300" href="#cart">Cart
                        {currentTotalCart > 0 && (
                            <span className="inline-flex items-center justify-center rounded-full bg-emerald-900 px-2.5 py-0.5 text-xs font-bold text-white dark:bg-emerald-300 dark:text-slate-900">
                                {currentTotalCart}
                            </span>)}

                    </a>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        aria-pressed={theme === "dark"}
                        className="rounded-lg p-2 text-lg transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:hover:bg-slate-700"
                    >
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                </div>
            </nav>
        </header>
    );
}
