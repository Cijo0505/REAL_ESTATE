from flask import Flask, request, jsonify
import joblib
import pandas as pd
from pathlib import Path

app = Flask(__name__)

# Model location
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "house_model.pkl"

# Load trained model
model = joblib.load(MODEL_PATH)

print("House price model loaded successfully!")


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


@app.route("/")
def home():
    return "House Price Prediction API is running!"


@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.get_json()

        # Get values from frontend
        city = data["city"]
        area = float(data["area"])
        bedrooms = int(data["bedrooms"])
        bathrooms = int(data["bathrooms"])
        property_type = data["property_type"]
        property_age = int(data["property_age"])

        # Create input in the SAME format used during training
        input_data = pd.DataFrame([{
            "city": city,
            "area": area,
            "bedrooms": bedrooms,
            "bathrooms": bathrooms,
            "property_type": property_type,
            "property_age": property_age
        }])

        # Predict price
        prediction = model.predict(input_data)

        return jsonify({
            "predicted_price": float(prediction[0])
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 400


if __name__ == "__main__":
    import os
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 10000))
    )