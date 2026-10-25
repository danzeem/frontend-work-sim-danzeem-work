import type { Product } from "../types/product";
function ProductCard(props: Product) {
    return (
        <>
            <div className="max-w-xs border border-gray-200 rounded-lg  shadow-sm">
                <div className="bg-gray-100  p-4 ">
                    <img
                        src={props.thumbnail}
                        alt={props.title || "Product image"}
                        className="object-contain h-48 w-full"
                    />
                </div>
                <div className="p-4 ">
                    <h3 className="font-bold text-gray-500">{props.brand?.toUpperCase()}</h3>
                    <p className="font-bold">{props.title}</p>
                    <div className="flex justify-between mt-1">
                        <div><p className="text-[#005943] font-bold">${props.price}</p></div>
                        <div>
                            <span className="text-[#2c4151]">★ {props.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;