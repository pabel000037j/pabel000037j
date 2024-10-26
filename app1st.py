from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Endpoint to serve the game interface
@app.route('/')
def index():
    return render_template('index.html')

# Spin endpoint for AJAX requests
@app.route('/spin', methods=['POST'])
def spin():
    # Retrieve bet amount from request
    bet = int(request.json.get('bet', 1))
    outcome = random.choice(['win', 'lose'])
    winnings = bet * 2 if outcome == 'win' else 0
    result = {"outcome": outcome, "winnings": winnings}
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000)
