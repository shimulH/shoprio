import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#f7f4ea] text-[#10261d]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="hero-orb left-[8%] top-28 h-36 w-36 bg-[#dff0cf]" />
        <div className="hero-orb right-[10%] top-20 h-44 w-44 bg-[#f2b84b]" />
        <div className="hero-orb bottom-12 left-[42%] h-28 w-28 bg-[#9ad9b0]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-6 lg:px-10 lg:pb-28">
          <header className="fade-up flex items-center justify-between gap-4 rounded-full border border-[rgba(16,38,29,0.1)] bg-white/80 px-5 py-3 backdrop-blur">
            <Link href="/" className="flex items-center gap-3">
              <span className="rounded-full bg-[#10261d] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                sagactlab
              </span>
              <span className="text-sm text-[#4f6258]">Commerce platform for ambitious brands</span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm text-[#4f6258] lg:flex">
              <a href="#platform" className="hover:text-[#10261d]">
                Platform
              </a>
              <a href="#workflow" className="hover:text-[#10261d]">
                Workflow
              </a>
              <a href="#stories" className="hover:text-[#10261d]">
                Stories
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-[#173327] hover:text-[#0f7a4f]">
                Log in
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-[#0f7a4f] px-4 py-2 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[#0d5c3d]"
              >
                Start free
              </Link>
            </div>
          </header>

          <div className="grid gap-12 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-24">
            <div className="fade-up-delay">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,122,79,0.14)] bg-white/80 px-4 py-2 text-sm text-[#0f7a4f]">
                <span className="h-2 w-2 rounded-full bg-[#0f7a4f]" />
                Sell, operate, and grow from one place
              </div>

              <h1 className="mt-6 max-w-3xl [font-family:var(--font-fraunces)] text-5xl leading-[0.96] tracking-[-0.04em] lg:text-7xl">
                sagactlab gives your store the kind of operating system high-growth brands rely on.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#55675d]">
                Launch a polished storefront, centralize your commerce workflow, and step into a control room built for orders, products, customers, and real-time decisions.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/login"
                  className="rounded-full bg-[#10261d] px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[#0c1d17]"
                >
                  Start with sagactlab
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-full border border-[rgba(16,38,29,0.12)] bg-white px-6 py-3 text-sm font-semibold text-[#173327] hover:-translate-y-0.5 hover:border-[#0f7a4f] hover:text-[#0f7a4f]"
                >
                  View dashboard
                </Link>
              </div>

              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-[rgba(16,38,29,0.1)] bg-white/80 p-4 shadow-[0_12px_40px_rgba(18,54,39,0.08)]">
                  <p className="text-sm text-[#66786e]">Monthly revenue</p>
                  <p className="mt-2 text-2xl font-semibold">$82.4K</p>
                </div>
                <div className="rounded-[1.5rem] border border-[rgba(16,38,29,0.1)] bg-white/80 p-4 shadow-[0_12px_40px_rgba(18,54,39,0.08)]">
                  <p className="text-sm text-[#66786e]">Conversion uplift</p>
                  <p className="mt-2 text-2xl font-semibold">+12.4%</p>
                </div>
                <div className="rounded-[1.5rem] border border-[rgba(16,38,29,0.1)] bg-white/80 p-4 shadow-[0_12px_40px_rgba(18,54,39,0.08)]">
                  <p className="text-sm text-[#66786e]">Repeat buyers</p>
                  <p className="mt-2 text-2xl font-semibold">34%</p>
                </div>
              </div>
            </div>

            <div className="fade-up-slow relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(15,122,79,0.18),rgba(242,184,75,0.18))] blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(16,38,29,0.12)] bg-[#10261d] p-5 text-white shadow-[0_30px_100px_rgba(16,38,29,0.24)]">
                <div className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/55">Live dashboard</p>
                    <p className="mt-1 text-lg font-semibold">sagactlab control center</p>
                  </div>
                  <div className="rounded-full bg-[#dff0cf] px-3 py-1 text-xs font-semibold text-[#10261d]">
                    12 new orders
                  </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-[1.5rem] bg-white p-4 text-[#10261d]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#66786e]">Today&apos;s sales</p>
                        <p className="mt-1 text-3xl font-semibold">$14,860</p>
                      </div>
                      <span className="rounded-full bg-[#dff0cf] px-3 py-1 text-xs font-semibold text-[#0d5c3d]">
                        +18.2%
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3">
                      <div className="rounded-2xl bg-[#f7f4ea] p-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#66786e]">Top Channel</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span>Online Store</span>
                          <span className="font-semibold">$8,240</span>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-[#f7f4ea] p-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#66786e]">Pending Review</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span>High-risk orders</span>
                          <span className="font-semibold">03</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                    <div className="flex items-center justify-between text-sm text-white/72">
                      <span>Order pipeline</span>
                      <span>Updated now</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        ["#SHP-1821", "Olivia Bennett", "Delivered", "Paid"],
                        ["#SHP-1820", "Ethan Reed", "In Progress", "Partially Refunded"],
                        ["#SHP-1819", "Mia Robinson", "Needs review", "Pending"],
                      ].map(([id, customer, fulfillment, financial]) => (
                        <div
                          key={id}
                          className="rounded-[1.25rem] border border-white/8 bg-[#163429] px-4 py-3"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold">{customer}</p>
                              <p className="text-xs text-white/55">{id}</p>
                            </div>
                            <span className="rounded-full bg-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                              {financial}
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-[#dff0cf]">{fulfillment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Storefronts that feel premium",
              body: "Craft fast, conversion-oriented shopping experiences with a visual language your brand actually owns.",
            },
            {
              title: "Operations with less noise",
              body: "See order risk, fulfillment progress, payment events, and customer history without hopping across tools.",
            },
            {
              title: "Growth signals you can act on",
              body: "Keep the metrics that matter close at hand so merchandising and support teams move with confidence.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-[rgba(16,38,29,0.1)] bg-white p-6 shadow-[0_16px_40px_rgba(18,54,39,0.08)]"
            >
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0f7a4f]">Platform</p>
              <h2 className="mt-4 [font-family:var(--font-fraunces)] text-3xl leading-tight">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#5f7167]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="bg-[#10261d] px-6 py-16 text-white lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#dff0cf]">Workflow</p>
            <h2 className="mt-4 [font-family:var(--font-fraunces)] text-4xl leading-tight lg:text-5xl">
              From product launch to fulfillment, everything moves through one flow.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
              sagactlab is designed for founders and operators who want the elegance of a storefront brand and the control of a real commerce back office.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Track every order with payment, shipping, notes, and audit history in one workspace.",
              "Review product inventory and pricing without losing sight of what is already selling.",
              "Keep customer value and retention visible alongside support and operational context.",
              "Hand your team a dashboard that feels calm, structured, and actually usable day to day.",
            ].map((item, index) => (
              <div
                key={item}
                className={`rounded-[1.6rem] border border-white/10 p-5 ${
                  index % 2 === 0 ? "bg-white/8" : "bg-[#173327]"
                }`}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#dff0cf] text-sm font-bold text-[#10261d]">
                  0{index + 1}
                </div>
                <p className="text-sm leading-7 text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-[#dff0cf] p-8 text-[#10261d]">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0d5c3d]">Built for momentum</p>
            <h2 className="mt-4 [font-family:var(--font-fraunces)] text-4xl leading-tight">
              The public website sells the promise. The dashboard keeps the promise.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#365244]">
              Visitors meet a strong storefront brand first, then your team steps into a dedicated control center after login. That split is now reflected in this app.
            </p>
            <div className="mt-8">
              <Link
                href="/login"
                className="inline-flex rounded-full bg-[#10261d] px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[#0c1d17]"
              >
                Enter dashboard
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              ["Launch faster", "A polished brand-facing homepage now leads the experience instead of dropping users straight into admin."],
              ["Stay consistent", "The dashboard has been rebranded to sagactlab so the login flow and internal app feel connected."],
              ["Keep flexibility", "Orders, products, customers, analytics, and settings still exist as separate dashboard routes."],
            ].map(([title, body]) => (
              <article
                key={title}
                className="rounded-[1.75rem] border border-[rgba(16,38,29,0.1)] bg-white p-6 shadow-[0_12px_40px_rgba(18,54,39,0.08)]"
              >
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f7167]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
