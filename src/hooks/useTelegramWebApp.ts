import { useEffect, useState } from 'react';
import { WebApp } from '@twa-dev/sdk';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

interface TelegramWebAppState {
  isReady: boolean;
  colorScheme: 'light' | 'dark';
  user?: TelegramUser;
}

export function useTelegramWebApp(): TelegramWebAppState {
  const [state, setState] = useState<TelegramWebAppState>({
    isReady: false,
    colorScheme: 'light'
  });

  useEffect(() => {
    try {
      // Check if we're in development environment
      const isDevelopment = window.location.hostname === 'localhost' || 
                          window.location.hostname.includes('webcontainer');

      if (isDevelopment) {
        setState({
          isReady: true,
          colorScheme: 'light',
          user: { id: 12345, first_name: 'Test User' }
        });
        return;
      }

      if (WebApp) {
        WebApp.ready();
        WebApp.expand();
        
        setState({
          isReady: true,
          colorScheme: WebApp.colorScheme || 'light',
          user: WebApp.initDataUnsafe?.user
        });
      }
    } catch (error) {
      console.error('Failed to initialize Telegram Web App:', error);
      setState(prev => ({ ...prev, isReady: true }));
    }
  }, []);

  return state;
}