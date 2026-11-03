import type { Product } from "../types/product";
import ProductGrid from "../components/ProductGrid";
import EmptyState from "./EmptyState";

interface ProductSectionProps {
    title: string;
    products: Product[];
}
export default function ProductSection({title, products}: ProductSectionProps) {
        if (products.length === 0) {
            return <EmptyState title= {title} />;       
        }
    return (
        < >
            <h2 className="text-2xl pt-1 pl-2 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl tracking-tight">
              {title}
            </h2>
            <ProductGrid products={products} />
        </>
    )
}