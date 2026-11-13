import { Link, NavLink } from "react-router-dom";
import type { Theme } from "../App";
import type { CartItem } from "../types/cart";

export type NavbarProps = {
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
    const navStyle = " inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium text-gray-600  hover:text-emerald-700 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-900 aria-[current=page]:font-semibold transition-colors dark:aria-[current=page]:bg-emerald-900/35 dark:aria-[current=page]:text-emerald-100";
    
    return (
        <header className="border-b border-[#e1e8f0] bg-white transition-colors dark:border-slate-700 dark:bg-slate-900">
            <nav
                className="flex min-h-[66px] w-full items-center justify-between gap-4 px-5 py-4 sm:px-9"
                aria-label="Main navigation"
            >
                <Link to="/" className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#075c49] text-[11px] text-white dark:bg-emerald-600" aria-hidden="true">
                        ▲
                    </span>
                    <span className="truncate text-base font-extrabold tracking-tight text-[#075c49] dark:text-emerald-300 sm:text-xl">
                        SummitGear Market
                    </span>
                </Link>

                <div className="flex shrink-0 items-center gap-3 text-sm text-[#263b59] dark:text-slate-200 sm:gap-8">

                    <NavLink to="/" className= {navStyle}>
                        Shop
                    </NavLink>

                    <NavLink to="/favorites" className={navStyle}>
                        Favorites
                        {favourites.length > 0 && (
                            <span className="ml-2 rounded-full bg-emerald-900 px-2 py-0.5 text-xs font-bold text-white">
                                {favourites.length}
                            </span>
                        )}
                    </NavLink>

                    <NavLink to="/cart" className={navStyle}>
                        Cart
                        {currentTotalCart > 0 && (
                            <span className="ml-2 rounded-full bg-emerald-900 px-2 py-0.5 text-xs font-bold text-white">
                                {currentTotalCart}
                            </span>
                        )}
                    </NavLink>

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
