from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "Hello, Flask!"})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    return jsonify({
        "leaf_mg_received": 0,
        "diseases_detected": "None",
        "treatment": "Use"
    })

if __name__ == '__main__':
    app.run()