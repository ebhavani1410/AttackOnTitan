from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/laws_of_motion", methods=["POST"])
def laws_of_motion():
    data = request.json

    mass = float(data["mass"])
    force = float(data["force"])
    time = float(data["time"])

    acceleration = force / mass
    velocity = acceleration * time
    displacement = 0.5 * acceleration * (time ** 2)

    return jsonify({
        "acceleration": acceleration,
        "velocity": velocity,
        "displacement": displacement
    })

if __name__ == "__main__":
    app.run(debug=True)
