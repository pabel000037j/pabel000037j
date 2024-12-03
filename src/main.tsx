import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

// Wait for Telegram Web App script to load
const waitForTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else if (window.location.hostname === 'localhost' || window.location.hostname.includes('webcontainer')) {
    // Development environment - render without Telegram Web App
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    rootElement.innerHTML = `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; text-align: center;">
        <h1>Please open this app in Telegram</h1>
      </div>
    `;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitForTelegramWebApp);
} else {
  waitForTelegramWebApp();
}
