from flask import Flask, request, jsonify
from flask_cors import CORS
from model import GPT2PPLV2

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://127.0.0.1:5500"}})

model = GPT2PPLV2()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    result, verdict, highlights= model.call_1_1(text, chunk_value=15)

    print("Model Highlights:", highlights)

    return jsonify({
        'prob': result['prob'],
        'label': result['label'],
        'verdict': verdict,
        'highlights': highlights
    })

if __name__ == '__main__':
    app.run(debug=True)
