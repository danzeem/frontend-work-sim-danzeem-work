// This is your storefront. Each ticket adds a piece to it.
// Start with tickets/day-1/1.1-product-type-and-card.md

import { products } from "./data/products";
import ProductSection from "./components/ProductSection";
import EmptyState from "./components/EmptyState";
import Navbar from "./components/Navbar";
import Footer  from "./components/Footer";
function App() {
    const dealsUnder20 = products.filter((p) => p.price < 20);
    const topRated = products.filter((p) => p.stock >= 10 && p.rating >= 4.5);
    const furniture= products.filter((p) => p.category = "furniture");
    const luxuryOver5000 = products.filter((p) => p.category === "luxury" && p.price > 5000);
    return (
        <>
            <main className="min-h-screen bg-gray-50 ">
                <Navbar />
                <ProductSection title = "Deals Under $20" products={dealsUnder20} />
                <ProductSection title = "Top Rated" products={topRated} />
                <ProductSection title = "Furniture" products={furniture} />
                <ProductSection title = "Luxury (over $5,000)" products={luxuryOver5000} />
                <Footer />
            </main>
        </>
    );
}

export default App;
