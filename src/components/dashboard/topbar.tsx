import { logoutAction } from "@/app/login/actions";

export function Topbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dce4db] bg-[#fffdf8] px-5 py-4">
      <div>
        <p className="text-sm text-[#66786e]">Welcome back</p>
        <h2 className="[font-family:var(--font-fraunces)] text-2xl text-[#10261d]">sagactlab dashboard</h2>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search orders, products..."
          className="w-60 rounded-full border border-[#d5dfd5] bg-[#f6f4ec] px-4 py-2 text-sm text-[#274437] outline-none focus:border-[#0f7a4f]"
        />
        <button className="rounded-full bg-[#0f7a4f] px-4 py-2 text-sm font-medium text-white hover:bg-[#0d5c3d]">+ New Product</button>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-full border border-[#d5dfd5] bg-white px-4 py-2 text-sm font-medium text-[#274437] hover:border-[#0f7a4f] hover:text-[#0f7a4f]"
          >
            Log Out
          </button>
        </form>
      </div>
    </header>
  );
}
