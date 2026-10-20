export default function AdminPageHeader({ title, description, section }) {
    return (
        <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 px-6 py-7 text-white shadow-lg shadow-indigo-900/10 sm:px-8 sm:py-9">
            <div
                aria-hidden="true"
                className="absolute -right-12 -top-24 -z-10 h-64 w-64 rounded-full border-[32px] border-white/5"
            />
            <div
                aria-hidden="true"
                className="absolute -bottom-28 right-28 -z-10 h-56 w-56 rounded-full bg-violet-400/10 blur-2xl"
            />
            <div className="relative max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    {section}
                </div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
                    {description}
                </p>
            </div>
        </div>
    );
}
