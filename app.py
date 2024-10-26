from flask import Flask, render_template
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
import os

# Flask app setup
app = Flask(__name__)

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/spin_game')
def spin_game():
    return render_template('spin_game.html')

if __name__ == '__main__':
    app.run(debug=True)


# Replace with your actual web app URL
WEB_APP_URL = "https://winz.onrender.com"  # e.g., your hosted spin game

# Telegram bot token
BOT_TOKEN = "7172433067:AAHROgYtz_Ws3QhYAlnf0EKC2-ouyv5d9b8"

async def start(update: "telegram.Update", context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("Play Spin Game", web_app=WebAppInfo(url=WEB_APP_URL))]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        "Welcome! Tap below to play the spin game.", reply_markup=reply_markup
    )

def start_flask():
    # Start the Flask app
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))

if __name__ == "__main__":
    # Set up the Telegram bot
    application = ApplicationBuilder().token(BOT_TOKEN).build()
    application.add_handler(CommandHandler("start", start))

    # Start the bot in a separate thread
    import threading
    threading.Thread(target=start_flask).start()

    # Run the Telegram bot
    application.run_polling()

