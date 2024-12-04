import React from 'react';
import { Share2 } from 'lucide-react';
import { WebApp } from '@twa-dev/sdk';

export const InviteButton: React.FC = () => {
  const handleInvite = () => {
    const botUsername = import.meta.env.VITE_BOT_USERNAME;
    const inviteLink = `https://t.me/${botUsername}?start=invite`;
    
    if (WebApp?.showPopup) {
      WebApp.showPopup({
        title: '🎮 Invite Friends',
        message: 'Share this game with your friends and play together!',
        buttons: [
          {
            type: 'default',
            text: 'Share Link',
            id: 'share'
          }
        ]
      });
      
      // Use Telegram's native sharing when available
      if (WebApp?.MainButton) {
        WebApp.MainButton.setText('Share Game');
        WebApp.MainButton.onClick(() => {
          window.Telegram?.WebApp?.switchInlineQuery('Play Spin & Win with me! 🎮');
        });
        WebApp.MainButton.show();
        
        setTimeout(() => {
          WebApp.MainButton.hide();
        }, 2000);
      }
    }
  };

  return (
    <button
      onClick={handleInvite}
      className="fixed bottom-4 right-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                text-white rounded-full p-4 shadow-lg transform transition-all duration-300 
                hover:scale-110 active:scale-95 flex items-center gap-2 animate-pulse hover:animate-none"
    >
      <Share2 className="w-5 h-5" />
      <span className="font-semibold">Invite Friends</span>
    </button>
  );
};
