import { create } from 'zustand';
import { TelegramStorage } from '../services/telegramStorage';
import { INITIAL_COINS } from '../config/constants';

interface GameState {
  spinning: boolean;
  coins: number;
  selectedAmount: number;
  history: {
    timestamp: number;
    bet: number;
    multiplier: number;
    won: number;
  }[];
  setSpinning: (spinning: boolean) => void;
  setCoins: (coins: number | ((prev: number) => number)) => void;
  setSelectedAmount: (amount: number) => void;
  addToHistory: (bet: number, multiplier: number, won: number) => void;
  loadUserData: (userId: string) => Promise<void>;
  saveUserData: () => Promise<void>;
}

export const useGameStore = create<GameState>((set, get) => ({
  spinning: false,
  coins: INITIAL_COINS,
  selectedAmount: 100,
  history: [],
  setSpinning: (spinning) => set({ spinning }),
  setCoins: (coinsOrFn) => set((state) => ({
    coins: typeof coinsOrFn === 'function' ? coinsOrFn(state.coins) : coinsOrFn,
  })),
  setSelectedAmount: (amount) => set({ selectedAmount: amount }),
  addToHistory: (bet, multiplier, won) =>
    set((state) => ({
      history: [
        {
          timestamp: Date.now(),
          bet,
          multiplier,
          won,
        },
        ...state.history,
      ].slice(0, 50), // Keep only last 50 spins
    })),
  loadUserData: async (userId) => {
    const data = await TelegramStorage.getUserData(userId);
    if (data) {
      set({
        coins: data.coins,
        history: data.history,
      });
    }
  },
  saveUserData: async () => {
    const state = get();
    const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString();
    if (!userId) return;

    await TelegramStorage.saveUserData({
      userId,
      coins: state.coins,
      history: state.history,
    });
  },
}));