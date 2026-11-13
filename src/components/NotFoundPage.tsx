import { Link } from "react-router-dom";

type NotFoundPageProps = {
    pathname?: string;
    onBackToShop?: () => void;
};

/**
 * A presentational 404 page. It intentionally does not import React Router.
 * Pass the current pathname and navigation callback when you wire it up.
 */
export default function NotFoundPage({
    pathname = "/asdf",
}: NotFoundPageProps) {
    return (
        <main className="flex min-h-[435px] flex-1 items-center justify-center bg-[#f7f9fc] px-5 py-16 text-center dark:bg-slate-950 sm:min-h-[435px]">
            <section aria-labelledby="not-found-heading" className="mx-auto flex w-full max-w-xl flex-col items-center">
                <p className="text-[90px] font-extrabold leading-none tracking-tight text-[#006149] dark:text-emerald-400 sm:text-[108px]">
                    404
                </p>

                <h1
                    id="not-found-heading"
                    className="mt-3 text-[26px] font-extrabold leading-tight text-[#0f1b33] dark:text-slate-100 sm:text-[32px]"
                >
                    This page wandered off
                </h1>

                <p className="mt-2 text-base text-[#7184a1] dark:text-slate-400">
                    We couldn't find <span className="font-bold">{pathname}</span>.
                </p>

                <Link
                    to="/"
                    className="mt-6 rounded-xl bg-[#006149] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#004d3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                >
                    Back to the shop
                </Link>
            </section>
        </main>
    );
}
