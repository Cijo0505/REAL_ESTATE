
from pathlib import Path

import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

# File locations
BASE_DIR = Path(__file__).resolve().parent

DATASET_PATH = BASE_DIR / "dataset" / "houses.csv"
MODEL_PATH = BASE_DIR / "models" / "house_model.pkl"

# Load dataset
df = pd.read_csv(DATASET_PATH)

print("Dataset loaded successfully!")
print("Total records:", len(df))

# Input features
features = [
    "city",
    "area",
    "bedrooms",
    "bathrooms",
    "property_type",
    "property_age"
]

X = df[features]
y = df["price"]

# Convert text columns into numeric features
preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(handle_unknown="ignore"),
            ["city", "property_type"]
        )
    ],
    remainder="passthrough"
)

# Create machine learning pipeline
model = Pipeline([
    ("preprocessor", preprocessor),
    (
        "regressor",
        RandomForestRegressor(
            n_estimators=200,
            random_state=42
        )
    )
])

# Split dataset into training and testing data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train the model
print("Training model...")

model.fit(X_train, y_train)

# Evaluate the model
predictions = model.predict(X_test)

print("\nMODEL EVALUATION")
print("MAE:", mean_absolute_error(y_test, predictions))
print(
    "RMSE:",
    mean_squared_error(y_test, predictions) ** 0.5
)
print("R2:", r2_score(y_test, predictions))

# Save the model
MODEL_PATH.parent.mkdir(
    parents=True,
    exist_ok=True
)

joblib.dump(model, MODEL_PATH)

print("\nModel saved successfully!")
print("Location:", MODEL_PATH)