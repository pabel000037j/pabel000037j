import { WebApp } from '@twa-dev/sdk';

export const isDevelopmentEnvironment = (): boolean => {
  return window.location.hostname === 'localhost' || 
         window.location.hostname.includes('webcontainer');
};

export const showMainButton = (text: string, duration: number = 2000): void => {
  try {
    if (WebApp?.MainButton) {
      WebApp.MainButton.setText(text);
      WebApp.MainButton.show();
      setTimeout(() => {
        WebApp.MainButton.hide();
      }, duration);
    }
  } catch (error) {
    console.error('Failed to show MainButton:', error);
  }
};