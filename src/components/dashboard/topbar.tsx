export function Topbar() {
  return (
    <header className="sticky top-0 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4">
      <div>
        <p className="text-sm text-slate-500">Good morning</p>
        <h2 className="text-xl font-semibold text-slate-900">Shimul Store</h2>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search orders, products..."
          className="w-60 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
        />
        <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
          + New Product
        </button>
      </div>
    </header>
  );
}
