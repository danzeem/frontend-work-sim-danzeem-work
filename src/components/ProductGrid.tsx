import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

type ProductGridProps = { products: Product[] };

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
