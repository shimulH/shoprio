import Link from 'next/link';
import { LanguageSwitcher } from '@/components/language-switcher';
import { getLanguage } from '@/lib/i18n';

const copy = {
  en: {
    badge: 'Be the next big thing',
    heroTitle:
      'Commerce infrastructure for brands that want to grow beautifully.',
    heroBody:
      'Build a premium storefront, run campaigns, manage inventory, monitor orders, and operate your back office from one calm, powerful system.',
    startTrial: 'Start free trial',
    explore: 'Explore the platform',
    navSolutions: 'Solutions',
    navPlatform: 'Platform',
    navPricing: 'Pricing',
    navContact: 'Contact',
    platformTagline: 'All-in-one commerce platform',
    featuredLaunch: 'Featured launch',
    featuredTitle: 'A premium storefront with the systems to support it.',
    sales: "Today's sales",
    orders: 'Orders',
    repeatCustomers: 'Returning customers',
    aov: 'AOV',
    storyChip: 'Designed for modern commerce teams',
    featuredStats: '+18.2%',
    logos: ['LUMEN', 'PULSE', 'NORTHSTAR', 'ACRE', 'ATLAS', 'MOTION'],
    stories: [
      {
        eyebrow: 'The commerce command center',
        title: 'Run the business, not just the storefront.',
        body: 'sagactlab connects merchandising, campaigns, orders, payments, and fulfillment in one operating system built for teams that need speed and clarity at the same time.',
      },
      {
        eyebrow: 'The growth engine',
        title: 'Launch faster with a platform designed to move with your team.',
        body: 'Publish campaigns, manage product drops, monitor customer behavior, and keep performance visible without duct-taping together five separate tools.',
      },
      {
        eyebrow: 'The operations layer',
        title:
          'See every order in full context before small issues become expensive ones.',
        body: 'Risk signals, support notes, shipping status, payments, and customer value all live inside the same workspace so teams can act with confidence.',
      },
    ],
    orderOverview: 'Order overview',
    fulfillmentPipeline: 'Fulfillment pipeline',
    queueItems: ['Queued', 'Packed', 'Shipped', 'Support', 'Review', 'Returns'],
    campaignPerformance: 'Campaign performance',
    storeConversion: 'Store conversion',
    topChannel: 'Top channel',
    revenueGrowth: 'Revenue growth',
    alerts: 'Alerts',
    teamWorkspace: 'Team workspace',
    workspaceTiles: ['Notes', 'Audit', 'Tags', 'Shipping'],
    topChannelValue: 'Online store',
    alertItems: [
      ['Risk flagged', 'New customer, device mismatch'],
      ['Label created', 'UPS Ground assigned'],
      ['Refund requested', 'Customer support follow-up'],
    ],
    orderCards: [
      ['#SAG-1821', 'Delivered', 'Paid'],
      ['#SAG-1820', 'In progress', 'Review'],
      ['#SAG-1819', 'Unfulfilled', 'Pending'],
    ],
    platformEyebrow: 'A platform for commerce businesses',
    platformTitle: 'Start, run, and scale from one operating layer.',
    platformBody:
      'sagactlab brings the creative side of storefront growth and the operational side of fulfillment into one system designed for momentum.',
    platformCards: [
      'Sell online and manage campaigns from one polished workspace.',
      'Track orders, payments, inventory, and customer activity in real time.',
      'Give support and fulfillment teams the same clean source of truth.',
      'Turn a premium storefront into a repeatable operational system.',
    ],
    metrics: [
      ['12.4%', 'Conversion lift after launch'],
      ['82K', 'Monthly revenue across channels'],
      ['34%', 'Returning customer rate'],
    ],
    momentumEyebrow: 'Built for momentum',
    momentumTitle:
      'A premium website in front. A real operating system after login.',
    momentumBody:
      'The public site now carries a lighter editorial tone, while the signed-in dashboard remains the control center for your team.',
    startToday: 'Start today',
    momentumCardTitle:
      'Bring sagactlab to your storefront and operations workflow.',
    viewDashboard: 'View dashboard',
    footerAddress: '5/14, block-B, Lalmatia, Dhaka, 1207',
    footerPhoneLabel: 'Phone',
    footerPhone: '+8801715030023',
    footerSections: {
      platform: 'Platform',
      company: 'Company',
      legal: 'Legal',
    },
    footerLinks: {
      platform: ['Storefronts', 'Orders', 'Customers'],
      company: ['About', 'Contact', 'Support'],
      legal: ['Privacy', 'Terms', 'Security'],
    },
    copyright: 'Copyright © 2026 sagactlab. All rights reserved.',
  },
  bn: {
    badge: 'পরবর্তী বড় ব্র্যান্ড হয়ে উঠুন',
    heroTitle:
      'যে ব্র্যান্ডগুলো সুন্দরভাবে বড় হতে চায়, তাদের জন্য কমার্স অবকাঠামো।',
    heroBody:
      'একটি প্রিমিয়াম স্টোরফ্রন্ট তৈরি করুন, ক্যাম্পেইন চালান, ইনভেন্টরি ম্যানেজ করুন, অর্ডার মনিটর করুন এবং এক শান্ত কিন্তু শক্তিশালী সিস্টেম থেকে ব্যাক অফিস পরিচালনা করুন।',
    startTrial: 'ফ্রি ট্রায়াল শুরু করুন',
    explore: 'প্ল্যাটফর্ম দেখুন',
    navSolutions: 'সমাধান',
    navPlatform: 'প্ল্যাটফর্ম',
    navPricing: 'মূল্য',
    navContact: 'যোগাযোগ',
    platformTagline: 'অল-ইন-ওয়ান কমার্স প্ল্যাটফর্ম',
    featuredLaunch: 'ফিচারড লঞ্চ',
    featuredTitle: 'একটি প্রিমিয়াম স্টোরফ্রন্ট, যার পেছনে আছে পুরো সিস্টেম।',
    sales: 'আজকের বিক্রি',
    orders: 'অর্ডার',
    repeatCustomers: 'ফিরে আসা কাস্টমার',
    aov: 'গড় অর্ডার ভ্যালু',
    storyChip: 'আধুনিক কমার্স টিমের জন্য ডিজাইন করা',
    featuredStats: '+১৮.২%',
    logos: ['LUMEN', 'PULSE', 'NORTHSTAR', 'ACRE', 'ATLAS', 'MOTION'],
    stories: [
      {
        eyebrow: 'কমার্স কমান্ড সেন্টার',
        title: 'শুধু স্টোরফ্রন্ট নয়, পুরো ব্যবসা চালান।',
        body: 'sagactlab মার্চেন্ডাইজিং, ক্যাম্পেইন, অর্ডার, পেমেন্ট এবং ফুলফিলমেন্টকে এক অপারেটিং সিস্টেমে আনে, যা গতি ও স্বচ্ছতা দুটোই চাওয়া টিমের জন্য তৈরি।',
      },
      {
        eyebrow: 'গ্রোথ ইঞ্জিন',
        title:
          'এমন একটি প্ল্যাটফর্মে দ্রুত লঞ্চ করুন যা আপনার টিমের সাথে তাল মিলিয়ে চলে।',
        body: 'ক্যাম্পেইন প্রকাশ করুন, প্রোডাক্ট ড্রপ ম্যানেজ করুন, কাস্টমার আচরণ মনিটর করুন এবং পাঁচটি আলাদা টুল ছাড়াই পারফরম্যান্স দেখুন।',
      },
      {
        eyebrow: 'অপারেশনস লেয়ার',
        title: 'ছোট সমস্যা বড় হওয়ার আগে প্রতিটি অর্ডার পুরো প্রেক্ষাপটে দেখুন।',
        body: 'রিস্ক সিগন্যাল, সাপোর্ট নোট, শিপিং স্ট্যাটাস, পেমেন্ট এবং কাস্টমার ভ্যালু সব একই ওয়ার্কস্পেসে থাকে, যাতে টিম আত্মবিশ্বাসের সাথে কাজ করতে পারে।',
      },
    ],
    orderOverview: 'অর্ডার ওভারভিউ',
    fulfillmentPipeline: 'ফুলফিলমেন্ট পাইপলাইন',
    queueItems: ['কিউড', 'প্যাকড', 'শিপড', 'সাপোর্ট', 'রিভিউ', 'রিটার্নস'],
    campaignPerformance: 'ক্যাম্পেইন পারফরম্যান্স',
    storeConversion: 'স্টোর কনভার্সন',
    topChannel: 'শীর্ষ চ্যানেল',
    revenueGrowth: 'রেভিনিউ গ্রোথ',
    alerts: 'অ্যালার্ট',
    teamWorkspace: 'টিম ওয়ার্কস্পেস',
    workspaceTiles: ['নোটস', 'অডিট', 'ট্যাগ', 'শিপিং'],
    topChannelValue: 'অনলাইন স্টোর',
    alertItems: [
      ['রিস্ক ফ্ল্যাগড', 'নতুন কাস্টমার, ডিভাইস মিসম্যাচ'],
      ['লেবেল তৈরি', 'UPS Ground অ্যাসাইনড'],
      ['রিফান্ড অনুরোধ', 'কাস্টমার সাপোর্ট ফলো-আপ'],
    ],
    orderCards: [
      ['#SAG-1821', 'ডেলিভারড', 'পেইড'],
      ['#SAG-1820', 'চলমান', 'রিভিউ'],
      ['#SAG-1819', 'আনফুলফিলড', 'পেন্ডিং'],
    ],
    platformEyebrow: 'কমার্স ব্যবসার জন্য একটি প্ল্যাটফর্ম',
    platformTitle: 'একই অপারেটিং লেয়ার থেকে শুরু করুন, চালান এবং বড় করুন।',
    platformBody:
      'sagactlab স্টোরফ্রন্ট গ্রোথের ক্রিয়েটিভ দিক এবং ফুলফিলমেন্টের অপারেশনাল দিককে একসাথে আনে, যেন আপনি গতি ধরে রাখতে পারেন।',
    platformCards: [
      'একটি পরিপাটি ওয়ার্কস্পেস থেকে অনলাইনে বিক্রি করুন এবং ক্যাম্পেইন চালান।',
      'রিয়েল টাইমে অর্ডার, পেমেন্ট, ইনভেন্টরি এবং কাস্টমার অ্যাক্টিভিটি ট্র্যাক করুন।',
      'সাপোর্ট ও ফুলফিলমেন্ট টিমকে একই নির্ভরযোগ্য সোর্স অব ট্রুথ দিন।',
      'একটি প্রিমিয়াম স্টোরফ্রন্টকে পুনরাবৃত্তিযোগ্য অপারেটিং সিস্টেমে রূপ দিন।',
    ],
    metrics: [
      ['১২.৪%', 'লঞ্চের পর কনভার্সন বৃদ্ধি'],
      ['৮২K', 'সব চ্যানেলে মাসিক রেভিনিউ'],
      ['৩৪%', 'ফিরে আসা কাস্টমার রেট'],
    ],
    momentumEyebrow: 'গতি ধরে রাখার জন্য তৈরি',
    momentumTitle: 'সামনে প্রিমিয়াম ওয়েবসাইট। লগইনের পরে আসল অপারেটিং সিস্টেম।',
    momentumBody:
      'পাবলিক সাইট এখন হালকা এডিটোরিয়াল টোন বহন করে, আর সাইন-ইন করা ড্যাশবোর্ড থাকে আপনার টিমের কন্ট্রোল সেন্টার হিসেবে।',
    startToday: 'আজই শুরু করুন',
    momentumCardTitle:
      'আপনার স্টোরফ্রন্ট ও অপারেশনস ওয়ার্কফ্লোতে sagactlab নিয়ে আসুন।',
    viewDashboard: 'ড্যাশবোর্ড দেখুন',
    footerAddress: '৫/১৪, ব্লক-বি, লালমাটিয়া, ঢাকা ১২০৭',
    footerPhoneLabel: 'ফোন',
    footerPhone: '০১৭১৫০৩০০২৩',
    footerSections: {
      platform: 'প্ল্যাটফর্ম',
      company: 'কোম্পানি',
      legal: 'আইনি',
    },
    footerLinks: {
      platform: ['স্টোরফ্রন্ট', 'অর্ডার', 'কাস্টমার'],
      company: ['আমাদের সম্পর্কে', 'যোগাযোগ', 'সাপোর্ট'],
      legal: ['প্রাইভেসি', 'টার্মস', 'সিকিউরিটি'],
    },
    copyright: 'কপিরাইট © ২০২৬ sagactlab। সর্বস্বত্ব সংরক্ষিত।',
  },
} as const;

export default async function Home() {
  const language = await getLanguage();
  const t = copy[language];

  return (
    <main className='bg-[#f7f4ea] text-[#10261d]'>
      <section className='relative overflow-hidden border-b border-[rgba(15,38,29,0.08)] bg-[radial-gradient(circle_at_top,rgba(15,122,79,0.10),transparent_25%),linear-gradient(180deg,#fffdf6_0%,#f7f4ea_100%)]'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(15,38,29,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,38,29,0.04)_1px,transparent_1px)] bg-[size:38px_38px] opacity-30' />

        <div className='relative mx-auto max-w-7xl px-5 pb-18 pt-5 lg:px-8 lg:pb-24'>
          <header className='fade-up flex items-center justify-between gap-4 rounded-full border border-[rgba(15,38,29,0.1)] bg-white/90 px-4 py-3 shadow-[0_12px_30px_rgba(18,54,39,0.08)] backdrop-blur'>
            <Link href='/' className='flex items-center gap-3'>
              <span className='rounded-full bg-[#0f261d] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white'>
                sagactlab
              </span>
              <span className='hidden text-sm text-[#5f7167] md:inline'>
                {t.platformTagline}
              </span>
            </Link>

            <nav className='hidden items-center gap-6 text-sm text-[#5f7167] lg:flex'>
              <a href='#stories' className='hover:text-[#10261d]'>
                {t.navSolutions}
              </a>
              <a href='#platform' className='hover:text-[#10261d]'>
                {t.navPlatform}
              </a>
              <a href='#footer' className='hover:text-[#10261d]'>
                {t.navPricing}
              </a>
              <a href='#footer' className='hover:text-[#10261d]'>
                {t.navContact}
              </a>
            </nav>

            <div className='flex items-center gap-3'>
              <LanguageSwitcher currentLanguage={language} pathname='/' />
              <Link
                href='/login'
                className='text-sm font-medium text-[#173327] hover:text-[#0f7a4f]'
              >
                {language === 'en' ? 'Log in' : 'লগ ইন'}
              </Link>
              <Link
                href='/login'
                className='rounded-full bg-[#0f261d] px-4 py-2 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[#163429]'
              >
                {t.startTrial}
              </Link>
            </div>
          </header>

          <div className='grid gap-10 pt-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:pt-16'>
            <div className='fade-up-delay'>
              <p className='text-sm font-medium uppercase tracking-[0.22em] text-[#0f7a4f]'>
                {t.badge}
              </p>
              <h1 className='mt-4 max-w-4xl font-display text-5xl leading-[0.92] tracking-[-0.05em] text-[#10261d] lg:text-[5.4rem]'>
                {t.heroTitle}
              </h1>
              <p className='mt-6 max-w-2xl text-lg leading-8 text-[#5f7167]'>
                {t.heroBody}
              </p>

              <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                <Link
                  href='/login'
                  className='rounded-full bg-[#0f261d] px-7 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[#163429]'
                >
                  {t.startTrial}
                </Link>
                <Link
                  href='/dashboard'
                  className='rounded-full border border-[rgba(15,38,29,0.12)] bg-white px-7 py-3 text-sm font-semibold text-[#10261d] hover:-translate-y-0.5 hover:border-[#0f7a4f] hover:text-[#0f7a4f]'
                >
                  {t.explore}
                </Link>
              </div>
            </div>

            <div className='fade-up-slow'>
              <div className='overflow-hidden rounded-[2rem] border border-[rgba(15,38,29,0.1)] bg-white shadow-[0_36px_90px_rgba(18,54,39,0.14)]'>
                <div className='relative min-h-[420px] overflow-hidden px-6 py-6'>
                  <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,122,79,0.10),transparent_28%),linear-gradient(180deg,rgba(15,38,29,0.03),transparent_45%)]' />
                  <div className='relative z-10 flex h-full flex-col justify-between'>
                    <div className='max-w-sm'>
                      <p className='text-xs uppercase tracking-[0.24em] text-[#74857b]'>
                        {t.featuredLaunch}
                      </p>
                      <h2 className='mt-4 font-display text-4xl leading-tight text-[#10261d]'>
                        {t.featuredTitle}
                      </h2>
                    </div>

                    <div className='grid gap-4 pt-14 md:grid-cols-[1fr_0.9fr]'>
                      <div className='rounded-[1.6rem] border border-[rgba(15,38,29,0.08)] bg-[#0f261d] p-4 text-white'>
                        <div className='flex items-center justify-between'>
                          <div>
                            <p className='text-sm text-white/64'>{t.sales}</p>
                            <p className='mt-1 text-3xl font-semibold'>
                              $14,860
                            </p>
                          </div>
                          <span className='rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0f261d]'>
                            {t.featuredStats}
                          </span>
                        </div>
                        <div className='mt-5 flex h-24 items-end gap-2'>
                          {[28, 40, 36, 56, 62, 78, 88].map((height, index) => (
                            <div
                              key={height}
                              className={`flex-1 rounded-full ${index === 6 ? 'bg-white' : 'bg-white/38'}`}
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className='space-y-3'>
                        {[
                          [t.orders, '1,284'],
                          [t.repeatCustomers, '34%'],
                          [t.aov, '$64'],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className='rounded-[1.2rem] border border-[rgba(15,38,29,0.08)] bg-[#f8f6ee] px-4 py-3'
                          >
                            <p className='text-sm text-[#74857b]'>{label}</p>
                            <p className='mt-1 text-2xl font-semibold text-[#10261d]'>
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-14 grid gap-3 rounded-[1.6rem] border border-[rgba(15,38,29,0.08)] bg-white/80 p-4 text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#74857b] sm:grid-cols-3 lg:grid-cols-6'>
            {t.logos.map((item) => (
              <div
                key={item}
                className='rounded-full border border-[rgba(15,38,29,0.08)] bg-white px-4 py-3'
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id='stories'
        className='mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20'
      >
        <div className='grid gap-5'>
          {t.stories.map((story, index) => (
            <article
              key={story.title}
              className='grid gap-6 rounded-[2rem] border border-[rgba(15,38,29,0.08)] bg-white p-5 shadow-[0_18px_50px_rgba(18,54,39,0.08)] lg:grid-cols-[0.84fr_1.16fr] lg:p-6'
            >
              <div className='flex flex-col justify-between rounded-[1.6rem] bg-[#f8f6ee] p-6'>
                <div>
                  <p className='text-sm font-medium uppercase tracking-[0.22em] text-[#0f7a4f]'>
                    {story.eyebrow}
                  </p>
                  <h2 className='mt-4 font-display text-4xl leading-tight text-[#10261d]'>
                    {story.title}
                  </h2>
                  <p className='mt-5 max-w-xl text-base leading-8 text-[#5f7167]'>
                    {story.body}
                  </p>
                </div>
                <div className='mt-10 inline-flex rounded-full border border-[rgba(15,38,29,0.08)] bg-white px-4 py-2 text-sm text-[#5f7167]'>
                  {t.storyChip}
                </div>
              </div>

              <div
                className={`rounded-[1.6rem] border p-5 ${
                  index === 0
                    ? 'border-[rgba(15,38,29,0.08)] bg-[linear-gradient(180deg,#f3f8f0_0%,#eef5ea_100%)]'
                    : index === 1
                      ? 'border-[rgba(15,38,29,0.08)] bg-[linear-gradient(180deg,#eef5ea_0%,#f8f6ee_100%)]'
                      : 'border-[rgba(15,38,29,0.08)] bg-[linear-gradient(180deg,#f7f4ea_0%,#eef5ea_100%)]'
                }`}
              >
                {index === 0 ? (
                  <div className='grid gap-4 lg:grid-cols-[0.9fr_1.1fr]'>
                    <div className='rounded-[1.3rem] bg-white p-4 text-[#081310]'>
                      <p className='text-sm text-[#6b7280]'>
                        {t.orderOverview}
                      </p>
                      <div className='mt-4 space-y-3'>
                        {t.orderCards.map(([id, status, payment]) => (
                          <div
                            key={id}
                            className='rounded-2xl bg-[#f4f7fb] px-4 py-3'
                          >
                            <div className='flex items-center justify-between'>
                              <span className='font-medium'>{id}</span>
                              <span className='text-xs text-[#64748b]'>
                                {payment}
                              </span>
                            </div>
                            <p className='mt-2 text-sm text-[#0f7a4f]'>
                              {status}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='rounded-[1.3rem] bg-[#0f261d] p-4 text-white'>
                      <p className='text-sm text-white/64'>
                        {t.fulfillmentPipeline}
                      </p>
                      <div className='mt-4 grid grid-cols-3 gap-3'>
                        {t.queueItems.map((item) => (
                          <div
                            key={item}
                            className='rounded-2xl border border-white/10 bg-white/6 px-3 py-4 text-center text-sm'
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : index === 1 ? (
                  <div className='grid gap-4 lg:grid-cols-[1.1fr_0.9fr]'>
                    <div className='rounded-[1.3rem] bg-[#0f7a4f] p-5 text-white'>
                      <p className='text-sm text-white/68'>
                        {t.campaignPerformance}
                      </p>
                      <div className='mt-5 grid grid-cols-5 gap-2'>
                        {[50, 64, 58, 78, 92].map((height) => (
                          <div
                            key={height}
                            className='rounded-full bg-white/10 p-2'
                          >
                            <div className='h-28 rounded-full bg-white/12'>
                              <div
                                className='w-full rounded-full bg-white'
                                style={{ height: `${height}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='space-y-4'>
                      <div className='rounded-[1.3rem] bg-white p-4 text-[#081310]'>
                        <p className='text-sm text-[#6b7280]'>
                          {t.storeConversion}
                        </p>
                        <p className='mt-2 text-3xl font-semibold'>3.8%</p>
                      </div>
                      <div className='rounded-[1.3rem] bg-[#f8f6ee] p-4'>
                        <p className='text-sm text-[#74857b]'>{t.topChannel}</p>
                        <p className='mt-2 text-2xl font-semibold text-[#10261d]'>
                          {t.topChannelValue}
                        </p>
                      </div>
                      <div className='rounded-[1.3rem] bg-[#f8f6ee] p-4'>
                        <p className='text-sm text-[#74857b]'>
                          {t.revenueGrowth}
                        </p>
                        <p className='mt-2 text-2xl font-semibold text-[#10261d]'>
                          +18%
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='grid gap-4 lg:grid-cols-[0.95fr_1.05fr]'>
                    <div className='rounded-[1.3rem] bg-[#0f261d] p-4 text-white'>
                      <p className='text-sm text-white/64'>{t.alerts}</p>
                      <div className='mt-4 space-y-3'>
                        {t.alertItems.map(([title, subtitle]) => (
                          <div
                            key={title}
                            className='rounded-2xl border border-white/10 bg-white/6 px-4 py-3'
                          >
                            <p className='font-medium'>{title}</p>
                            <p className='mt-1 text-sm text-white/56'>
                              {subtitle}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='rounded-[1.3rem] bg-white p-4 text-[#081310]'>
                      <p className='text-sm text-[#6b7280]'>
                        {t.teamWorkspace}
                      </p>
                      <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                        {t.workspaceTiles.map((item) => (
                          <div
                            key={item}
                            className='rounded-2xl bg-[#f4f7fb] px-4 py-6 text-center font-medium'
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id='platform'
        className='border-y border-[rgba(15,38,29,0.08)] bg-white px-5 py-14 lg:px-8 lg:py-20'
      >
        <div className='mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.84fr_1.16fr]'>
          <div>
            <p className='text-sm font-medium uppercase tracking-[0.22em] text-[#0f7a4f]'>
              {t.platformEyebrow}
            </p>
            <h2 className='mt-4 max-w-2xl font-display text-4xl leading-tight text-[#10261d] lg:text-5xl'>
              {t.platformTitle}
            </h2>
            <p className='mt-5 max-w-xl text-base leading-8 text-[#5f7167]'>
              {t.platformBody}
            </p>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            {t.platformCards.map((item, index) => (
              <article
                key={item}
                className={`rounded-[1.6rem] border p-6 ${
                  index === 1
                    ? 'border-[rgba(15,38,29,0.08)] bg-[#0f261d] text-white'
                    : 'border-[rgba(15,38,29,0.08)] bg-[#f8f6ee] text-[#10261d]'
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${
                    index === 1
                      ? 'bg-white text-[#0f261d]'
                      : 'bg-white text-[#0f7a4f]'
                  }`}
                >
                  0{index + 1}
                </div>
                <p className='mt-5 text-base leading-8'>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20'>
        <div className='grid gap-5 lg:grid-cols-3'>
          {t.metrics.map(([value, label]) => (
            <article
              key={label}
              className='rounded-[1.8rem] border border-[rgba(15,38,29,0.08)] bg-white p-6 shadow-[0_18px_44px_rgba(18,54,39,0.08)]'
            >
              <p className='text-4xl font-semibold text-[#10261d]'>{value}</p>
              <p className='mt-3 text-sm leading-7 text-[#5f7167]'>{label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='border-t border-[rgba(15,38,29,0.08)] bg-[radial-gradient(circle_at_bottom_left,rgba(15,122,79,0.10),transparent_22%),linear-gradient(180deg,#fffdf6_0%,#f3f8f0_100%)] px-5 py-16 lg:px-8 lg:py-24'>
        <div className='mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center'>
          <div>
            <p className='text-sm font-medium uppercase tracking-[0.22em] text-[#0f7a4f]'>
              {t.momentumEyebrow}
            </p>
            <h2 className='mt-4 max-w-3xl font-display text-4xl leading-tight text-[#10261d] lg:text-5xl'>
              {t.momentumTitle}
            </h2>
            <p className='mt-5 max-w-2xl text-base leading-8 text-[#5f7167]'>
              {t.momentumBody}
            </p>
          </div>

          <div className='rounded-[2rem] border border-[rgba(15,38,29,0.08)] bg-[#0f261d] p-8 shadow-[0_26px_70px_rgba(18,54,39,0.18)]'>
            <p className='text-sm uppercase tracking-[0.22em] text-white/60'>
              {t.startToday}
            </p>
            <h3 className='mt-4 font-display text-3xl leading-tight text-white'>
              {t.momentumCardTitle}
            </h3>
            <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
              <Link
                href='/login'
                className='rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0f261d] hover:-translate-y-0.5 hover:bg-[#edf2ee]'
              >
                {t.startTrial}
              </Link>
              <Link
                href='/dashboard'
                className='rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-white/6'
              >
                {t.viewDashboard}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer
        id='footer'
        className='border-t border-[rgba(15,38,29,0.08)] bg-white'
      >
        <div className='mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-8'>
          <div>
            <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0f7a4f]'>
              sagactlab
            </p>
            <p className='mt-4 max-w-sm text-sm leading-7 text-[#5f7167]'>
              {t.footerAddress}
            </p>
            <p className='text-sm leading-7 text-[#5f7167]'>
              {t.footerPhoneLabel}: {t.footerPhone}
            </p>
          </div>

          <div className='grid gap-8 text-sm text-[#5f7167] sm:grid-cols-3'>
            <div>
              <p className='font-semibold uppercase tracking-[0.2em] text-[#10261d]'>
                {t.footerSections.platform}
              </p>
              <div className='mt-4 space-y-3'>
                {t.footerLinks.platform.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
            <div>
              <p className='font-semibold uppercase tracking-[0.2em] text-[#10261d]'>
                {t.footerSections.company}
              </p>
              <div className='mt-4 space-y-3'>
                {t.footerLinks.company.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
            <div>
              <p className='font-semibold uppercase tracking-[0.2em] text-[#10261d]'>
                {t.footerSections.legal}
              </p>
              <div className='mt-4 space-y-3'>
                {t.footerLinks.legal.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-[rgba(15,38,29,0.08)] px-5 py-4 text-center text-sm text-[#74857b] lg:px-8'>
          {t.copyright}
        </div>
      </footer>
    </main>
  );
}
