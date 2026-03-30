import Link from "next/link";
import { loginAction } from "@/app/login/actions";
import { demoCredentials, redirectIfAuthenticated } from "@/lib/auth";

type LoginPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  await redirectIfAuthenticated();
  const params = (await searchParams) ?? {};
  const hasError = params.error === "invalid_credentials";

  return (
    <main className="min-h-screen bg-[#f7f4ea] px-6 py-8 text-[#10261d]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-[rgba(16,38,29,0.12)] bg-[#fffdf6] shadow-[0_24px_80px_rgba(18,54,39,0.12)] lg:flex-row">
        <section className="relative flex flex-1 flex-col justify-between overflow-hidden bg-[#0f7a4f] px-8 py-10 text-white lg:px-12 lg:py-12">
          <div className="hero-orb -left-14 top-12 h-40 w-40 bg-[#d8ff98]" />
          <div className="hero-orb bottom-12 right-[-2rem] h-48 w-48 bg-[#f2b84b]" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
              <span className="rounded-full border border-white/20 px-2 py-1 text-[11px] uppercase tracking-[0.22em]">
                sagactlab
              </span>
              Commerce OS
            </Link>

            <h1 className="mt-8 max-w-md [font-family:var(--font-fraunces)] text-4xl leading-tight lg:text-5xl">
              Sign in to run your store from one calm workspace.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/78 lg:text-base">
              Orders, catalog, analytics, customer ops, and fulfillment all continue in the dashboard after login.
            </p>
          </div>

          <div className="relative z-10 grid gap-4 rounded-[1.5rem] border border-white/14 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center justify-between text-sm text-white/80">
              <span>Today&apos;s revenue</span>
              <span>+18.2%</span>
            </div>
            <div className="text-3xl font-semibold">$82,430</div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-white/70">Orders</p>
                <p className="mt-1 font-semibold">1,284</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-white/70">Repeat</p>
                <p className="mt-1 font-semibold">34%</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-white/70">AOV</p>
                <p className="mt-1 font-semibold">$64</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-1 items-center px-6 py-10 lg:px-12">
          <div className="mx-auto w-full max-w-md">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0f7a4f]">Welcome back</p>
              <h2 className="mt-3 [font-family:var(--font-fraunces)] text-3xl">Access your sagactlab dashboard</h2>
              <p className="mt-3 text-sm leading-7 text-[#5f7167]">
                Sign in with the demo credentials below and protected routes will unlock across the dashboard.
              </p>
            </div>

            <form action={loginAction} className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#173327]">Work email</span>
                <input
                  type="email"
                  name="email"
                  defaultValue={demoCredentials.email}
                  className="w-full rounded-2xl border border-[rgba(16,38,29,0.14)] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f7a4f]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#173327]">Password</span>
                <input
                  type="password"
                  name="password"
                  defaultValue={demoCredentials.password}
                  className="w-full rounded-2xl border border-[rgba(16,38,29,0.14)] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f7a4f]"
                />
              </label>

              {hasError ? (
                <p className="rounded-2xl border border-[#efc8bf] bg-[#fff0ea] px-4 py-3 text-sm text-[#9b4632]">
                  The email or password did not match the demo account.
                </p>
              ) : null}

              <div className="rounded-2xl border border-[rgba(16,38,29,0.08)] bg-[#f6f4ec] px-4 py-3 text-sm text-[#4d6257]">
                Demo login: <span className="font-semibold text-[#173327]">{demoCredentials.email}</span> /{" "}
                <span className="font-semibold text-[#173327]">{demoCredentials.password}</span>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#10261d] px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[#0c1d17]"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm text-[#5f7167]">
              <span>Need the public site first?</span>
              <Link href="/" className="font-medium text-[#0f7a4f] hover:text-[#0d5c3d]">
                Back to homepage
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
