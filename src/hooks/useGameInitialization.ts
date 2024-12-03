import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { WebApp } from '@twa-dev/sdk';

export function useGameInitialization() {
  const loadUserData = useGameStore((state) => state.loadUserData);

  useEffect(() => {
    const initGame = async () => {
      try {
        if (WebApp?.initDataUnsafe?.user?.id) {
          const userId = WebApp.initDataUnsafe.user.id.toString();
          await loadUserData(userId);
        }
      } catch (error) {
        console.error('Failed to initialize game:', error);
      }
    };

    initGame();
  }, [loadUserData]);
}