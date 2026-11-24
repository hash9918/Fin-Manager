import { motion } from 'framer-motion';

export function PlaceholderPage({ title }: { title: string }) {
  return <motion.section key={title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .24 }} aria-labelledby="page-title">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div><p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-indigo-400">Your money, in focus</p><h1 id="page-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1></div>
      <div className="rounded-full border border-black/5 bg-black/[.03] px-3 py-1.5 text-xs text-zinc-500 dark:border-white/10 dark:bg-white/[.04]">This month <span className="ml-1 text-zinc-800 dark:text-zinc-200">November 2026</span></div>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {['Total balance', 'Income', 'Expenses'].map((label, index) => <div key={label} className="rounded-2xl border border-black/[.06] bg-[rgb(var(--card))] p-5 shadow-card dark:border-white/[.07] sm:p-6">
        <div className="flex items-center justify-between"><span className="text-sm text-zinc-500">{label}</span><span className={`h-2 w-2 rounded-full ${index === 1 ? 'bg-income' : index === 2 ? 'bg-expense' : 'bg-indigo-400'}`} /></div>
        <div className="skeleton mt-5 h-8 w-36 rounded-lg" /><div className="skeleton mt-3 h-3 w-24 rounded-md" />
      </div>)}
    </div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
      <div className="rounded-2xl border border-black/[.06] bg-[rgb(var(--card))] p-5 shadow-card dark:border-white/[.07] sm:p-6">
        <div className="flex items-center justify-between"><div><h2 className="font-medium">Cash flow</h2><p className="mt-1 text-xs text-zinc-500">Income and expenses over time</p></div><div className="skeleton h-8 w-24 rounded-lg" /></div>
        <div className="mt-8 flex h-48 items-end gap-3 border-b border-black/5 pb-3 dark:border-white/[.07] sm:gap-5">{[48, 72, 56, 86, 62, 96, 66, 78, 50, 88, 60, 76].map((height, index) => <div key={index} className="flex h-full flex-1 items-end"><div className="skeleton w-full rounded-t-md" style={{ height: `${height}%` }} /></div>)}</div>
        <div className="mt-3 flex justify-between text-[10px] text-zinc-500"><span>Nov 1</span><span>Nov 8</span><span>Nov 15</span><span>Nov 22</span><span>Nov 30</span></div>
      </div>
      <div className="rounded-2xl border border-black/[.06] bg-[rgb(var(--card))] p-5 shadow-card dark:border-white/[.07] sm:p-6">
        <h2 className="font-medium">Recent transactions</h2><p className="mt-1 text-xs text-zinc-500">Your latest activity will show here</p>
        <div className="mt-7 space-y-5">{[0, 1, 2, 3].map((item) => <div key={item} className="flex items-center gap-3"><div className="skeleton h-10 w-10 shrink-0 rounded-xl" /><div className="min-w-0 flex-1"><div className="skeleton h-3 w-28 rounded" /><div className="skeleton mt-2 h-2.5 w-20 rounded" /></div><div className="skeleton h-3 w-16 rounded" /></div>)}</div>
      </div>
    </div>
    <p className="mt-6 text-center text-xs text-zinc-500">Your dashboard is getting ready</p>
  </motion.section>;
}
