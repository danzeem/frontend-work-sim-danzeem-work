type Suggestion = {
    productName: string,
    category: string,
    reason: string

}
export default function Suggestions({ productName, category, reason }: Suggestion) {
    return (
        <div>
            {/* SUGGESTION 1 */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-900">
                        {productName}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {category}
                    </span>
                </div>

                <p className="text-sm leading-relaxed text-slate-600">
                    {reason}
                </p>
            </div>
        </div>

    )
}