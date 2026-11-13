import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { NavbarProps } from "./Navbar";
import PromoBanner from "./PromoBanner";
import type { Theme } from "../App";
import type { CartItem } from "../types/cart";

export type LayoutProps = {
    theme: Theme;
    favourites: number[];
    carts: CartItem[];
    onThemeChange: (theme: Theme) => void;
    isClose: boolean;
    onClose: (isClose: boolean) => void;
    message: string;
    handleClear: () => void;
    isVisible: boolean;

};

export default function Layout({ favourites, theme, onThemeChange, carts, onClose, isClose, message, handleClear, isVisible}: LayoutProps){
    const currentPromoBanner = <PromoBanner message={message} handleClear={handleClear} />;
    return (
        <>
            <Navbar theme={theme} favourites={favourites} isClose={isClose} onClose={onClose} onThemeChange={onThemeChange} carts={carts} />
            {isVisible ? currentPromoBanner : undefined}
            <Outlet />
            <Footer />
        </>
    )
}