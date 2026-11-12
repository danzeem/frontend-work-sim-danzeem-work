import React, { useState, type ChangeEvent } from "react";
import groupByCategory from "../utils/groupByCategory";
import { products } from "../data/products";
import Suggestions from "./Suggestions";
export type Suggestion = {
    productName: string,
    category: string,
    reason: string

}
export default function SuggestProductForm() {
    const [error, setError] = useState<string[]>([]);
    const [currentSuggestions, setCurrentSuggestions] = useState<Suggestion[]>([]);
    const initialState = {
        productName: '',
        category: '',
        reason: ''
    }
    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        reason: ''
    });
    const fieldLabels: Record<keyof typeof formData, string> = {
        productName: 'Product Name',
        category: 'Category',
        reason: 'Reason'
    };
    const requiredFields: Array<keyof typeof formData> = ["productName", "reason"];
    const allProductsByCategory = groupByCategory(products);
    const allCategory = Object.keys(allProductsByCategory) as Array<string>;
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newErrors: string[] = [];
        requiredFields.forEach((key) => {
            if (formData[key].trim() === '') {
                newErrors.push(`"${fieldLabels[key]}" is required`)
            }
        });
        setError(newErrors);
        if (newErrors.length == 0) return;
        setCurrentSuggestions((prev) => [...prev, formData])
        setFormData(initialState)
    }

    return (
        <section className="mx-auto w-full max-w-3xl px-4 py-8">

            {/* FORM CARD */}
            <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
            >
                {/* HEADER */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Suggest a product
                    </h2>
                    <p className="mt-1 text-slate-500">
                        Tell us what you'd like to see in the store.
                    </p>
                </div>

                {/* VALIDATION BANNER */}
                {error.length > 0 && (
                    <div
                        role="alert"
                        className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                    >
                        Please fill out the product name and reason before submitting.
                    </div>
                )}

                {/* PRODUCT NAME & CATEGORY */}
                <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                    {/* PRODUCT NAME */}
                    <div>
                        <label
                            htmlFor="productName"
                            className="mb-2 block text-sm font-semibold text-slate-900"
                        >
                            Product name
                        </label>

                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            placeholder="e.g. Camping tent"
                            value={formData.productName}
                            onChange={handleChange}
                            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 
                                focus:ring-2 focus:ring-emerald-100 ${error.some((err) => err.includes("Product Name"))
                                    ? "border-red-400 bg-red-50"
                                    : "border-slate-300"
                                }`}
                        />

                        {error.some((err) => err.includes("Product Name")) && (
                            <p className="mt-1 text-xs font-semibold text-red-600">
                                Product name is required
                            </p>
                        )}
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <label
                            htmlFor="category"
                            className="mb-2 block text-sm font-semibold text-slate-900"
                        >
                            Category
                        </label>

                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        >
                            <option value="" disabled>
                                Select a category
                            </option>

                            {allCategory.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* REASON */}
                <div className="mb-5">
                    <label
                        htmlFor="reason"
                        className="mb-2 block text-sm font-semibold text-slate-900"
                    >
                        Why should we carry it?
                    </label>

                    <textarea
                        id="reason"
                        name="reason"
                        rows={4}
                        maxLength={200}
                        placeholder="Tell us why you'd like this product..."
                        value={formData.reason}
                        onChange={handleChange}
                        className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 
                            focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 ${error.some((err) => err.includes("Reason"))
                                ? "border-red-400 bg-red-50"
                                : "border-slate-300"
                            }`}
                    />

                    <div className="mt-1 flex items-center justify-between">
                        <div>
                            {error.some((err) => err.includes("Reason")) && (
                                <p className="text-xs font-semibold text-red-600">
                                    Reason is required
                                </p>
                            )}
                        </div>

                        <span className="text-xs text-slate-500">
                            {formData.reason.length} / 200
                        </span>
                    </div>
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    className="rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-[0.98]"
                >
                    Submit suggestion
                </button>
            </form>

            {/* SUGGESTIONS SECTION */}
            <div className="mt-8">
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                    Suggestions ({currentSuggestions.length})
                </h3>
                {currentSuggestions.map((suggestion, index) =>
                (
                    <div className="space-y-3">
                        <Suggestions key={index}  {...suggestion} />
                    </div>
                ))}

            </div>

        </section>
    );
}