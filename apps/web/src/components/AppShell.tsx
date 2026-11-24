import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BarChart3, CalendarDays, ChevronLeft, CircleDollarSign, Command, Home, Menu, Moon, Plus, Search, Sun, WalletCards } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';

const tabs = [
  { to: '/overview', label: 'Overview', icon: Home },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/budgets', label: 'Budgets', icon: WalletCards },
];

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [dialog, setDialog] = useState<'search' | 'transaction' | null>(null);
  const [syncStatus, setSyncStatus] = useState<'offline' | 'syncing' | 'synced'>(navigator.onLine ? 'synced' : 'offline');
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    let settleTimer: number | undefined;
    const updateStatus = () => {
      window.clearTimeout(settleTimer);
      if (!navigator.onLine) {
        setSyncStatus('offline');
        return;
      }
      setSyncStatus('syncing');
      settleTimer = window.setTimeout(() => setSyncStatus('synced'), 1200);
    };
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
      window.clearTimeout(settleTimer);
    };
  }, []);

  return (
    <div className="ambient-bg min-h-screen bg-[rgb(var(--page))] text-[rgb(var(--foreground))] transition-colors">
      <aside className={`fixed inset-y-0 left-0 z-30 hidden border-r border-zinc-900/10 bg-[rgb(var(--page))]/80 px-3 pt-7 backdrop-blur-xl transition-all dark:border-white/10 lg:block ${collapsed ? 'w-[84px]' : 'w-64'}`}>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-glow"><CircleDollarSign size={21} /></div>
            {!collapsed && <span className="whitespace-nowrap font-semibold tracking-tight">FinManager</span>}
          </div>
          <button className="rounded-lg p-2 text-zinc-500 hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <Menu size={17} /> : <ChevronLeft size={17} />}</button>
        </div>

        <div className="mt-9 space-y-1">
          {tabs.map(({ to, label, icon: Icon }) => <NavItem key={to} to={to} label={label} icon={<Icon size={19} />} collapsed={collapsed} />)}
        </div>

        {!collapsed && <div className="absolute inset-x-3 bottom-6 space-y-4">
          <div className="rounded-xl border border-black/5 bg-black/[.03] p-3 text-xs text-zinc-500 dark:border-white/10 dark:bg-white/[.03]">
            <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><Command size={13} /> Search</span><kbd className="rounded border border-black/10 px-1.5 py-0.5 dark:border-white/10">⌘ K</kbd></div>
            <div className="mt-2 flex items-center justify-between"><span className="flex items-center gap-1.5"><Plus size={13} /> New transaction</span><kbd className="rounded border border-black/10 px-1.5 py-0.5 dark:border-white/10">N</kbd></div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-black/5 bg-black/[.03] p-3 dark:border-white/10 dark:bg-white/[.03]">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600" />
            <div><div className="text-sm font-medium">Your account</div><div className="text-xs text-zinc-500">Personal workspace</div></div>
          </div>
        </div>}
      </aside>

      <div className={`min-h-screen transition-[padding] ${collapsed ? 'lg:pl-[84px]' : 'lg:pl-64'}`}>
        <header className="safe-top sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-black/5 bg-[rgb(var(--page))]/75 px-4 backdrop-blur-2xl dark:border-white/[.07] sm:px-7 lg:px-10">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600" aria-label="Avatar placeholder" role="img" />
            <span className="font-semibold tracking-tight">FinManager</span>
          </div>
          <div className="hidden items-center gap-2 text-sm text-zinc-500 lg:flex"><span className="capitalize">{location.pathname.split('/')[1] ?? 'Overview'}</span><span>/</span><span className="text-zinc-900 dark:text-zinc-200">Personal</span></div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="rounded-full border border-black/5 bg-black/[.03] px-2 py-1.5 text-[10px] font-medium text-zinc-600 dark:border-white/10 dark:bg-white/[.04] dark:text-zinc-300 sm:px-3 sm:text-xs">₹ INR</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-black/[.03] px-2 py-1.5 text-[10px] font-medium text-zinc-600 dark:border-white/10 dark:bg-white/[.04] dark:text-zinc-300 sm:px-2.5 sm:text-[11px]"><span className={`h-1.5 w-1.5 rounded-full ${syncStatus === 'offline' ? 'bg-amber-400' : syncStatus === 'syncing' ? 'animate-pulse bg-indigo-400' : 'bg-emerald-400'}`} />{syncStatus === 'offline' ? 'Offline' : syncStatus === 'syncing' ? 'Syncing' : 'Synced'}</span>
            <button className="rounded-full border border-black/5 p-2 text-zinc-500 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</button>
            <button className="hidden rounded-full border border-black/5 p-2 text-zinc-500 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10 lg:inline-flex" onClick={() => setDialog('search')} aria-label="Search (Command K)"><Search size={16} /></button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 pb-32 pt-7 sm:px-7 sm:pt-10 lg:px-10 lg:pb-12">
          <Outlet />
        </main>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-[rgb(var(--page))]/90 backdrop-blur-2xl dark:border-white/[.08] lg:hidden">
        <nav aria-label="Primary navigation" className="safe-bottom relative mx-auto flex h-[76px] max-w-lg items-center justify-around px-2">
          {tabs.slice(0, 2).map(({ to, label, icon: Icon }) => <MobileNavItem key={to} to={to} label={label} icon={<Icon size={20} />} />)}
          <button onClick={() => setDialog('transaction')} aria-label="Add transaction" className="-mt-8 grid h-[58px] w-[58px] place-items-center rounded-full border border-white/20 bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-glow transition-transform active:scale-95"><Plus size={25} strokeWidth={2.3} /></button>
          {tabs.slice(2).map(({ to, label, icon: Icon }) => <MobileNavItem key={to} to={to} label={label} icon={<Icon size={20} />} />)}
        </nav>
      </div>

      <AnimatePresence>{dialog && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-5 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialog(null); }}>
        <motion.section initial={{ y: 14, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 10, scale: .98 }} role="dialog" aria-modal="true" aria-labelledby="shell-dialog-title" className="w-full max-w-md rounded-2xl border border-white/10 bg-elevated p-6 shadow-card">
          <h2 id="shell-dialog-title" className="text-lg font-semibold">{dialog === 'search' ? 'Search FinManager' : 'New transaction'}</h2>
          {dialog === 'search' ? <input autoFocus aria-label="Search" placeholder="Search transactions…" className="mt-5 w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-indigo-400" /> : <p className="mt-2 text-sm text-zinc-400">Transaction entry will be available in a future phase.</p>}
          <button autoFocus={dialog === 'transaction'} onClick={() => setDialog(null)} className="mt-5 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15">Close</button>
        </motion.section>
      </motion.div>}</AnimatePresence>
    </div>
  );
}

function NavItem({ to, label, icon, collapsed }: { to: string; label: string; icon: ReactNode; collapsed: boolean }) {
  return <NavLink to={to} className={({ isActive }) => `relative flex h-11 items-center gap-3 rounded-xl px-3 text-sm transition-colors ${isActive ? 'text-indigo-500 dark:text-indigo-300' : 'text-zinc-500 hover:bg-black/5 hover:text-zinc-900 dark:hover:bg-white/[.05] dark:hover:text-zinc-200'} ${collapsed ? 'justify-center' : ''}`} title={collapsed ? label : undefined}>
    {({ isActive }) => <>{isActive && <motion.span layoutId="desktop-nav-active" className="absolute inset-0 rounded-xl bg-indigo-500/10" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}{icon}{!collapsed && <span className="relative z-10">{label}</span>}</>}
  </NavLink>;
}

function MobileNavItem({ to, label, icon }: { to: string; label: string; icon: ReactNode }) {
  return <NavLink to={to} className="relative z-10 flex min-w-[62px] flex-col items-center justify-center gap-1.5 py-2 text-zinc-500" aria-label={label}>
    {({ isActive }) => <><span className={`relative grid h-8 w-12 place-items-center rounded-full ${isActive ? 'text-indigo-500 dark:text-indigo-300' : ''}`}>{isActive && <motion.span layoutId="mobile-nav-active" className="absolute inset-0 rounded-full bg-indigo-500/10" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}{icon}</span><span className={`text-[10px] font-medium ${isActive ? 'text-indigo-600 dark:text-indigo-300' : ''}`}>{label}</span></>}
  </NavLink>;
}
