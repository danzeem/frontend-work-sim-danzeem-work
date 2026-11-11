// This is your storefront. Each ticket adds a piece to it.
// Start with tickets/day-1/1.1-product-type-and-card.md

import { products } from "./data/products";
import ProductSection from "./components/ProductSection";
import StatsBar from "./components/StatsBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import groupByCategory from "./utils/groupByCategory";
function App() {
    const group = groupByCategory(products);
    const byCategory = Object.entries(group).map(([category, products]) =>
    (<ProductSection
        key={category}
        title={`${category} (${products.length})`}
        products={products}
    />
    ));
    return (
        <>
            <main className="min-h-screen bg-gray-50 ">
                <Navbar />
                <StatsBar products={products} />
                {byCategory}
                <Footer />
            </main>
        </>
    );
}

export default App;
