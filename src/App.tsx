import React from 'react';
import { Wheel } from './components/Wheel';
import { Controls } from './components/Controls';
import { History } from './components/History';
import { Stats } from './components/Stats';
import { TransactionButtons } from './components/TransactionButtons';
import { useTelegramWebApp } from './hooks/useTelegramWebApp';
import { useGameInitialization } from './hooks/useGameInitialization';

export default function App() {
  const { isReady, colorScheme } = useTelegramWebApp();
  useGameInitialization();

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading Telegram Mini App...</p>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen p-4 flex flex-col items-center gap-6
        ${colorScheme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white' 
          : 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 text-gray-800'
        }`}
    >
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
        Spin & Win
      </h1>
      <Wheel />
      <Controls />
      <TransactionButtons />
      <History />
      <Stats />
    </div>
  );
}
