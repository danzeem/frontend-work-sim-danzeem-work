export default function EmptyState({ title }: { title: string }) {
    return (
        < >
            <h2 className="text-2xl pt-1 pb-2 pl-2 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl tracking-tight">
                {title}
            </h2>
            <div className="rounded-xl border-2 h-[10rem] m-3 bg-white border-dashed border-gray-500 p-4 flex flex-col justify-center items-center">
                <h4 >No Products Here</h4>
                <p className="text-gray-400">Nothing To Match This Section. Check Back Soon!</p>
            </div>
        </>
    )
}