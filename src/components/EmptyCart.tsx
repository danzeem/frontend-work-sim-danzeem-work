import { Icon } from '@iconify/react';
export default function EmptyCart() {

    return (
        <section
            className="flex min-h-[178px] w-75 flex-col items-center justify-center rounded-[14px] border-2 border-dashed border-[#cfdbeb]
            bg-white px-11 py-8 text-center transition-colors dark:border-slate-600 dark:bg-slate-900 mx-10 my-5"
            aria-live="polite"
        >
            <span className="mb-2 text-[33px] leading-none" aria-hidden="true">
                <Icon icon="noto:shopping-cart" width="44" height="44" />
            </span>
            <h2 className="text-base font-bold text-[#17243b] dark:text-slate-100">Your cart is empty</h2>
            <p className="mt-1 text-sm text-[#627895] dark:text-slate-400">
                Add something you love from the shop.
            </p>
        </section>

    );
}