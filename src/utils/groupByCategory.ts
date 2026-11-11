import type { Product } from "../types/product.ts";

export default function groupByCategory(products: Product[]):
    Record<string, Product[]> {

    return products.reduce((groups, product) => {
        if (Object.hasOwn(groups, product.category)) {
            groups[product.category].push(product);

        } else {
            groups[product.category] = [product];

        }

        return groups;

    }, {} as Record<string, Product[]>);
} 
