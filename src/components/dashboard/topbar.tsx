import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="sticky top-0 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4">
      <div>
        <p className="text-sm text-slate-500">Good morning</p>
        <h2 className="text-xl font-semibold text-slate-900">Shimul Store</h2>
      </div>

      <div className="flex items-center gap-3">
        <Input
          type="text"
          placeholder="Search orders, products..."
          className="w-60 bg-slate-50"
        />
        <Button>+ New Product</Button>
      </div>
    </header>
  );
}
