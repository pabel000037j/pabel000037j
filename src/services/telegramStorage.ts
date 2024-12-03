import { WebApp } from '@twa-dev/sdk';

const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

interface StorageData {
  userId: string;
  coins: number;
  history: {
    timestamp: number;
    bet: number;
    multiplier: number;
    won: number;
  }[];
}

export class TelegramStorage {
  static async saveUserData(data: StorageData): Promise<boolean> {
    if (!BOT_TOKEN || !CHANNEL_ID) {
      console.warn('Bot token or channel ID not configured');
      return false;
    }

    try {
      const message = JSON.stringify(data);
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHANNEL_ID,
          text: message,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }

  static async getUserData(userId: string): Promise<StorageData | null> {
    if (!BOT_TOKEN || !CHANNEL_ID) {
      console.warn('Bot token or channel ID not configured');
      return null;
    }

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/getChat?chat_id=${CHANNEL_ID}`
      );
      
      if (!response.ok) return null;

      const messages = await response.json();
      const userMessage = messages.result.find((msg: any) => {
        try {
          const data = JSON.parse(msg.text);
          return data.userId === userId;
        } catch {
          return false;
        }
      });

      if (!userMessage) return null;

      return JSON.parse(userMessage.text);
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  }
}