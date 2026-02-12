import { useState, useEffect, useRef } from "react";

export default function Collision() {
  const [m1, setM1] = useState(2);
  const [m2, setM2] = useState(3);
  const [u1, setU1] = useState(5);
  const [u2, setU2] = useState(-2);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const [inputText, setInputText] = useState("");

  const canvasRef = useRef(null);

  // 🔥 NLP PARSER
  const parseInput = () => {
    const text = inputText.toLowerCase();

    const masses = [...text.matchAll(/(\d+)\s*kg/g)];
    const velocities = [...text.matchAll(/(-?\d+)\s*m\/?s/g)];

    if (masses.length >= 2) {
      setM1(parseFloat(masses[0][1]));
      setM2(parseFloat(masses[1][1]));
    }

    if (velocities.length >= 2) {
      setU1(parseFloat(velocities[0][1]));
      setU2(parseFloat(velocities[1][1]));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let x1 = 100;
    let x2 = 700;

    let v1 = u1;
    let v2 = u2;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      x1 += v1 * speedMultiplier;
      x2 += v2 * speedMultiplier;

      // Collision detection
      if (x1 + 40 >= x2 - 40) {
        const newV1 =
          ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
        const newV2 =
          ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2);

        v1 = newV1;
        v2 = newV2;
      }

      // Ground
      ctx.beginPath();
      ctx.moveTo(0, 350);
      ctx.lineTo(canvas.width, 350);
      ctx.strokeStyle = "#444";
      ctx.stroke();

      // Object 1
      ctx.fillStyle = "#ff5722";
      ctx.fillRect(x1, 300, 80, 50);

      // Object 2
      ctx.fillStyle = "#2196f3";
      ctx.fillRect(x2 - 80, 300, 80, 50);

      // Display velocities
      ctx.fillStyle = "#000";
      ctx.font = "18px Arial";
      ctx.fillText(`Object 1 Velocity: ${v1.toFixed(2)} m/s`, 30, 30);
      ctx.fillText(`Object 2 Velocity: ${v2.toFixed(2)} m/s`, 30, 60);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [m1, m2, u1, u2, speedMultiplier]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>🧠 Collision Simulation (AI Enabled)</h1>

      {/* 🔥 NLP SECTION */}
      <div
        style={{
          background: "#f5f7fa",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px"
        }}
      >
        <h2>Enter Physics Word Problem</h2>

        <input
          type="text"
          placeholder="Example: Two objects of 2 kg and 3 kg move at 5 m/s and -2 m/s"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "16px"
          }}
        />

        <button
          onClick={parseInput}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Analyze Problem
        </button>
      </div>

      <h2>Elastic Collision Formulas</h2>
      <p>v₁ = ((m₁ − m₂)u₁ + 2m₂u₂) / (m₁ + m₂)</p>
      <p>v₂ = ((m₂ − m₁)u₂ + 2m₁u₁) / (m₁ + m₂)</p>

      <hr style={{ margin: "30px 0" }} />

      <h2>Interactive Simulation</h2>

      <div>
        <label>Mass 1: {m1} kg</label><br />
        <input
          type="range"
          min="1"
          max="10"
          value={m1}
          onChange={(e) => setM1(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Mass 2: {m2} kg</label><br />
        <input
          type="range"
          min="1"
          max="10"
          value={m2}
          onChange={(e) => setM2(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Initial Velocity 1: {u1} m/s</label><br />
        <input
          type="range"
          min="-10"
          max="10"
          value={u1}
          onChange={(e) => setU1(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Initial Velocity 2: {u2} m/s</label><br />
        <input
          type="range"
          min="-10"
          max="10"
          value={u2}
          onChange={(e) => setU2(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Animation Speed: {speedMultiplier}x</label><br />
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={speedMultiplier}
          onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
        />
      </div>

      <canvas
        ref={canvasRef}
        width={900}
        height={400}
        style={{
          border: "2px solid #ddd",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          marginTop: "20px"
        }}
      />
    </div>
  );
}
