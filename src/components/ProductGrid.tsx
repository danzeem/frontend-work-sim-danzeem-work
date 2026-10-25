import type { Product } from "../types/product";
import ProductCard from './ProductCard';
import React from "react";
export default function ProductGrid({products}: {products: Product[]}) {
    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {products.map((product) => {
                return (
                    <ProductCard
                        key={product.id}
                        {...product}
                    />

                )
            })}
        </div>
    )
}