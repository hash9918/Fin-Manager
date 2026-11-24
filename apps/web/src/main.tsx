import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { toast } from 'sonner';
import { App } from './App';
import { ThemeProvider } from './theme/ThemeProvider';
import './styles.css';

let updateServiceWorker: (reloadPage?: boolean) => Promise<void> = () => Promise.resolve();
updateServiceWorker = registerSW({
  immediate: true,
  onNeedRefresh() {
    toast('A new version is ready', {
      description: 'Refresh to get the latest FinManager updates.',
      action: { label: 'Refresh', onClick: () => updateServiceWorker(true) },
      duration: Infinity,
    });
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
