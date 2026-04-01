import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { loginAction } from "@/app/login/actions";
import { demoCredentials, redirectIfAuthenticated } from "@/lib/auth";
import { getLanguage } from "@/lib/i18n";

type LoginPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  await redirectIfAuthenticated();
  const language = await getLanguage();
  const params = (await searchParams) ?? {};
  const hasError = params.error === "invalid_credentials";
  const copy =
    language === "bn"
      ? {
          commerceOs: "কমার্স ওএস",
          title: "একটি শান্ত কর্মপরিসর থেকে আপনার স্টোর চালাতে সাইন ইন করুন।",
          subtitle:
            "লগইনের পরে অর্ডার, ক্যাটালগ, অ্যানালিটিক্স, কাস্টমার অপস এবং ফুলফিলমেন্ট সব ড্যাশবোর্ডে পাওয়া যাবে।",
          todayRevenue: "আজকের রেভিনিউ",
          orders: "অর্ডার",
          repeat: "রিপিট",
          aov: "AOV",
          welcome: "আবার স্বাগতম",
          access: "আপনার sagactlab ড্যাশবোর্ডে প্রবেশ করুন",
          helper: "নিচের ডেমো ক্রেডেনশিয়াল দিয়ে সাইন ইন করুন, তাহলে প্রোটেক্টেড রুটগুলো খুলে যাবে।",
          workEmail: "ওয়ার্ক ইমেইল",
          password: "পাসওয়ার্ড",
          invalid: "ইমেইল বা পাসওয়ার্ড ডেমো অ্যাকাউন্টের সাথে মেলেনি।",
          demo: "ডেমো লগইন",
          signIn: "সাইন ইন",
          backLabel: "আগে পাবলিক সাইট দেখতে চান?",
          backHome: "হোমপেজে ফিরে যান",
        }
      : {
          commerceOs: "Commerce OS",
          title: "Sign in to run your store from one calm workspace.",
          subtitle:
            "Orders, catalog, analytics, customer ops, and fulfillment all continue in the dashboard after login.",
          todayRevenue: "Today's revenue",
          orders: "Orders",
          repeat: "Repeat",
          aov: "AOV",
          welcome: "Welcome back",
          access: "Access your sagactlab dashboard",
          helper: "Sign in with the demo credentials below and protected routes will unlock across the dashboard.",
          workEmail: "Work email",
          password: "Password",
          invalid: "The email or password did not match the demo account.",
          demo: "Demo login",
          signIn: "Sign In",
          backLabel: "Need the public site first?",
          backHome: "Back to homepage",
        };

  return (
    <main className="min-h-screen bg-[#f7f4ea] px-6 py-8 text-[#10261d]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-[rgba(15,38,29,0.12)] bg-[#fffdf6] shadow-[0_24px_80px_rgba(18,54,39,0.12)] lg:flex-row">
        <section className="relative flex flex-1 flex-col justify-between overflow-hidden bg-[linear-gradient(180deg,#0f261d_0%,#163429_100%)] px-8 py-10 text-white lg:px-12 lg:py-12">
          <div className="hero-orb -left-14 top-12 h-40 w-40 bg-[#d8ff98]" />
          <div className="hero-orb bottom-12 right-[-2rem] h-48 w-48 bg-[#dff0cf]" />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
                <span className="rounded-full border border-white/20 px-2 py-1 text-[11px] uppercase tracking-[0.22em]">
                  sagactlab
                </span>
                {copy.commerceOs}
              </Link>
              <LanguageSwitcher currentLanguage={language} pathname="/login" variant="dark" />
            </div>

            <h1 className="mt-8 max-w-md font-display text-4xl leading-tight lg:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/78 lg:text-base">
              {copy.subtitle}
            </p>
          </div>

          <div className="relative z-10 grid gap-4 rounded-[1.5rem] border border-white/14 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center justify-between text-sm text-white/80">
              <span>{copy.todayRevenue}</span>
              <span>+18.2%</span>
            </div>
            <div className="text-3xl font-semibold">$82,430</div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-white/70">{copy.orders}</p>
                <p className="mt-1 font-semibold">1,284</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-white/70">{copy.repeat}</p>
                <p className="mt-1 font-semibold">34%</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-white/70">{copy.aov}</p>
                <p className="mt-1 font-semibold">$64</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-1 items-center px-6 py-10 lg:px-12">
          <div className="mx-auto w-full max-w-md">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0f7a4f]">{copy.welcome}</p>
              <h2 className="mt-3 font-display text-3xl">{copy.access}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5f7167]">{copy.helper}</p>
            </div>

            <form action={loginAction} className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#173327]">{copy.workEmail}</span>
                <input
                  type="email"
                  name="email"
                  defaultValue={demoCredentials.email}
                  className="w-full rounded-2xl border border-[rgba(16,38,29,0.14)] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f7a4f]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#173327]">{copy.password}</span>
                <input
                  type="password"
                  name="password"
                  defaultValue={demoCredentials.password}
                  className="w-full rounded-2xl border border-[rgba(16,38,29,0.14)] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f7a4f]"
                />
              </label>

              {hasError ? (
                <p className="rounded-2xl border border-[#efc8bf] bg-[#fff0ea] px-4 py-3 text-sm text-[#9b4632]">
                  {copy.invalid}
                </p>
              ) : null}

              <div className="rounded-2xl border border-[rgba(16,38,29,0.08)] bg-[#f6f4ec] px-4 py-3 text-sm text-[#4d6257]">
                {copy.demo}: <span className="font-semibold text-[#173327]">{demoCredentials.email}</span> /{" "}
                <span className="font-semibold text-[#173327]">{demoCredentials.password}</span>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#0f261d] px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[#0c1d17]"
              >
                {copy.signIn}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm text-[#5f7167]">
              <span>{copy.backLabel}</span>
              <Link href="/" className="font-medium text-[#0f7a4f] hover:text-[#0d5c3d]">
                {copy.backHome}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
