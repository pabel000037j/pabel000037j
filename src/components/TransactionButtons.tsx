import React, { useState } from 'react';
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { WebApp } from '@twa-dev/sdk';

export const TransactionButtons: React.FC = () => {
  const { setCoins, saveUserData } = useGameStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTransaction = async (type: 'deposit' | 'withdraw') => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      if (type === 'deposit') {
        setCoins((prev) => prev + 1000);
        if (WebApp?.MainButton) {
          WebApp.MainButton.setText('Successfully deposited 1000 coins!');
          WebApp.MainButton.show();
        }
      } else {
        setCoins((prev) => Math.max(0, prev - 1000));
        if (WebApp?.MainButton) {
          WebApp.MainButton.setText('Successfully withdrew 1000 coins!');
          WebApp.MainButton.show();
        }
      }
      await saveUserData();
    } catch (error) {
      console.error('Transaction failed:', error);
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        WebApp?.MainButton?.hide();
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleTransaction('deposit')}
          disabled={isProcessing}
          className={`
            flex items-center justify-center gap-2 px-4 py-3 rounded-lg
            bg-green-500 text-white font-medium transition-all
            hover:bg-green-600 active:scale-95
            ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <ArrowDownToLine className="w-5 h-5" />
          Deposit
        </button>
        <button
          onClick={() => handleTransaction('withdraw')}
          disabled={isProcessing}
          className={`
            flex items-center justify-center gap-2 px-4 py-3 rounded-lg
            bg-blue-500 text-white font-medium transition-all
            hover:bg-blue-600 active:scale-95
            ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <ArrowUpFromLine className="w-5 h-5" />
          Withdraw
        </button>
      </div>
    </div>
  );
};