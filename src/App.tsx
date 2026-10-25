// This is your storefront. Each ticket adds a piece to it.
// Start with tickets/day-1/1.1-product-type-and-card.md

import { products } from "./data/products";
import type { Product } from "./types/product";

import ProductCard from "./components/ProductCard";

function App() {
    const singleProduct = products[0];

    return (
        <>
            <main className="min-h-screen bg-gray-50 p-8">
                <h1 className="text-3xl font-bold">SummitGear Market</h1>
                <p className="text-gray-600">Open the tickets folder to get started.</p>
            <ProductCard {...singleProduct} />
            </main>
        </>
    );
}

export default App;
