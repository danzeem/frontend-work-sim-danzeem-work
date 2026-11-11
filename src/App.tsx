import { useState } from "react";
import { products } from "./data/products";
import groupByCategory from "./utils/groupByCategory";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import StatsBar from "./components/StatsBar";
import ProductSection from "./components/ProductSection";
import ProductGrid from "./components/ProductGrid";
import EmptyState from "./components/EmptyState";
import Footer from "./components/Footer";

export type Theme = "dark" | "light";

export default function App() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<Theme>("light");

  const normalizedSearch = search.trim().toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(normalizedSearch)
  );
  const isSearching = normalizedSearch !== "";
  const groupedProducts = groupByCategory(filteredProducts);

  return (
    <div className={`${theme === "dark" ? "dark" : ""} min-h-screen flex flex-col`}>
      <Navbar theme={theme} onThemeChange={setTheme} />
      <main
        id="shop"
        className="flex-1 bg-[#f5f7fa] px-5 pb-8 pt-8 transition-colors dark:bg-slate-950 sm:px-9"
      >
        <SearchBar value={search} onSearchChange={setSearch} />
        <p className="mb-5 mt-3 text-sm text-[#627895] dark:text-slate-400" aria-live="polite">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        {/* Keep the earlier statistics feature out of search results. */}
        {!isSearching && <StatsBar products={products} />}

        {filteredProducts.length === 0 ? (
          <EmptyState title="No products found" query={search} />
        ) : isSearching ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="space-y-10">
            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
              <ProductSection
                key={category}
                title={`${category} (${categoryProducts.length})`}
                products={categoryProducts}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
