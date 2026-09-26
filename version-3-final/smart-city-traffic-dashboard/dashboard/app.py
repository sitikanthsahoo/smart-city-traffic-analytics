"""
Smart City Traffic Analytics — Local Dashboard
Serves the results of the Big Data Analytics (BDA) project notebook
(PySpark MapReduce, KMeans congestion clustering, GPT-2 scenario
simulation, STRIDE security analysis, future hotspot prediction)
as an interactive, locally-run web dashboard.

Run with:  python app.py
Then open: http://127.0.0.1:5000
"""
import json
from pathlib import Path

from flask import Flask, jsonify, render_template

BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "data.json"

app = Flask(__name__)


def load_data():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/data")
def api_data():
    """Single endpoint delivering every dataset the dashboard needs."""
    return jsonify(load_data())


@app.route("/api/mapreduce")
def api_mapreduce():
    data = load_data()
    return jsonify(data["mapreduce_top10"])


@app.route("/api/hotspots")
def api_hotspots():
    data = load_data()
    return jsonify(data["future_hotspots"])


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
