import { create } from 'zustand';

interface GameState {
  spinning: boolean;
  coins: number;
  selectedAmount: number;
  setSpinning: (spinning: boolean) => void;
  setCoins: (coins: number) => void;
  setSelectedAmount: (amount: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  spinning: false,
  coins: 1000,
  selectedAmount: 100,
  setSpinning: (spinning) => set({ spinning }),
  setCoins: (coins) => set({ coins }),
  setSelectedAmount: (amount) => set({ selectedAmount }),
}));