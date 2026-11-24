import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppShell } from './components/AppShell';
import { PlaceholderPage } from './components/PlaceholderPage';
import { useTheme } from './theme/ThemeProvider';

export function App() {
  const { theme } = useTheme();
  return (
    <BrowserRouter>
      <Toaster theme={theme} position="top-center" richColors closeButton />
      <Shortcuts />
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<PlaceholderPage title="Overview" />} />
          <Route path="calendar" element={<PlaceholderPage title="Calendar" />} />
          <Route path="analytics" element={<PlaceholderPage title="Analytics" />} />
          <Route path="budgets" element={<PlaceholderPage title="Budgets" />} />
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Shortcuts() {
  const location = useLocation();
  const [dialog, setDialog] = useState<'search' | 'transaction' | null>(null);

  useEffect(() => {
    setDialog(null);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      const isTyping = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
      if (isTyping) return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setDialog('search');
      } else if (event.key.toLowerCase() === 'n' && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setDialog('transaction');
      } else if (event.key === 'Escape') {
        setDialog(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return dialog ? (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialog(null); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="placeholder-dialog-title" className="w-full max-w-md rounded-2xl border border-white/10 bg-elevated p-6 shadow-card">
        <h2 id="placeholder-dialog-title" className="text-lg font-semibold">{dialog === 'search' ? 'Search FinManager' : 'New transaction'}</h2>
        <p className="mt-2 text-sm text-zinc-400">This is a placeholder for a future phase.</p>
        {dialog === 'search' && <input autoFocus aria-label="Search" placeholder="Search transactions…" className="mt-5 w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-indigo-400" />}
        <button autoFocus={dialog === 'transaction'} onClick={() => setDialog(null)} className="mt-5 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15">Close</button>
      </section>
    </div>
  ) : null;
}
