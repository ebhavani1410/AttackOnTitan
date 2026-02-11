import { useState } from "react";

function LawsOfMotion() {
  const [mass, setMass] = useState("");
  const [force, setForce] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState(null);

  const calculateMotion = async () => {
    const response = await fetch("http://localhost:5000/laws_of_motion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mass, force, time }),
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="topic-container">
      <h1>Laws of Motion Simulation</h1>

      <div className="input-box">
        <input
          type="number"
          placeholder="Mass (kg)"
          value={mass}
          onChange={(e) => setMass(e.target.value)}
        />

        <input
          type="number"
          placeholder="Force (N)"
          value={force}
          onChange={(e) => setForce(e.target.value)}
        />

        <input
          type="number"
          placeholder="Time (s)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button onClick={calculateMotion}>Run Simulation</button>
      </div>

      {result && (
        <div className="result-box">
          <p>Acceleration: {result.acceleration.toFixed(2)} m/s²</p>
          <p>Velocity: {result.velocity.toFixed(2)} m/s</p>
          <p>Displacement: {result.displacement.toFixed(2)} m</p>
        </div>
      )}
    </div>
  );
}

export default LawsOfMotion;
