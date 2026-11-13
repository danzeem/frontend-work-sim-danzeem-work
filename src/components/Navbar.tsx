import { Link } from "react-router-dom";
import type { Theme } from "../App";
import type { CartItem } from "../types/cart";

type NavbarProps = {
    theme: Theme;
    favourites: number[];
    carts: CartItem[];
    onThemeChange: (theme: Theme) => void;
    isClose: boolean;
    onClose: (isClose: boolean) => void;


};

export default function Navbar({ favourites, theme, onThemeChange, carts, onClose, isClose, }: NavbarProps) {
    function toggleTheme() {
        onThemeChange(theme === "dark" ? "light" : "dark");
    }
    function toClose() {
        onClose(isClose ? false : true);
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

                    <Link to="/" className="hover:text-emerald-700">
                        Shop
                    </Link>

                    <Link to="/favorites" className="hover:text-emerald-700">
                        Favorites
                        {favourites.length > 0 && (
                            <span className="ml-2 rounded-full bg-emerald-900 px-2 py-0.5 text-xs font-bold text-white">
                                {favourites.length}
                            </span>
                        )}
                    </Link>

                    <Link to="/cart" className="hover:text-emerald-700">
                        Cart
                        {currentTotalCart > 0 && (
                            <span className="ml-2 rounded-full bg-emerald-900 px-2 py-0.5 text-xs font-bold text-white">
                                {currentTotalCart}
                            </span>
                        )}
                    </Link>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="rounded-lg border border-slate-200 p-2"
                    >
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                </div>

            </nav>
        </header>
    );
}
