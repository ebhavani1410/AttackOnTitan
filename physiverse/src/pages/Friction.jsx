import { useState, useEffect, useRef } from "react";

export default function Friction() {
  const [mass, setMass] = useState(5);
  const [appliedForce, setAppliedForce] = useState(30);
  const [mu, setMu] = useState(0.3);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const [inputText, setInputText] = useState("");

  const canvasRef = useRef(null);

  const gravity = 9.8;
  const normalForce = mass * gravity;
  const frictionForce = mu * normalForce;

  const netForce =
    appliedForce > frictionForce
      ? appliedForce - frictionForce
      : 0;

  const acceleration = netForce / mass;

  // 🔥 NLP PARSER
  const parseInput = () => {
    const text = inputText.toLowerCase();

    const mMatch = text.match(/(\d+)\s*kg/);
    if (mMatch) setMass(parseFloat(mMatch[1]));

    const fMatch = text.match(/(\d+)\s*n/);
    if (fMatch) setAppliedForce(parseFloat(fMatch[1]));

    const muMatch = text.match(/mu\s*=?\s*(\d*\.?\d+)/);
    if (muMatch) setMu(parseFloat(muMatch[1]));

    // Alternative detection like "coefficient 0.4"
    const coeffMatch = text.match(/coefficient.*?(\d*\.?\d+)/);
    if (coeffMatch) setMu(parseFloat(coeffMatch[1]));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let startTime = null;

    const ground = canvas.height - 80;
    const scale = 20;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const t = ((timestamp - startTime) / 1000) * speedMultiplier;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ground
      ctx.beginPath();
      ctx.moveTo(0, ground);
      ctx.lineTo(canvas.width, ground);
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 3;
      ctx.stroke();

      let displacement = 0;

      if (appliedForce > frictionForce) {
        displacement = 0.5 * acceleration * t * t;
      }

      const x = Math.min(displacement * scale, canvas.width - 120);

      // Block
      ctx.fillStyle = "#ff5722";
      ctx.fillRect(x, ground - 60, 120, 60);

      // Physics Values
      ctx.fillStyle = "#000";
      ctx.font = "20px Arial";
      ctx.fillText(`Applied Force: ${appliedForce.toFixed(1)} N`, 40, 40);
      ctx.fillText(`Friction Force: ${frictionForce.toFixed(1)} N`, 40, 70);
      ctx.fillText(`Net Force: ${netForce.toFixed(1)} N`, 40, 100);
      ctx.fillText(`Acceleration: ${acceleration.toFixed(2)} m/s²`, 40, 130);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [mass, appliedForce, mu, speedMultiplier]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>🧠 Friction Simulation (AI Enabled)</h1>

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
          placeholder="Example: A 5 kg block is pushed with 40 N and coefficient 0.4"
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

      <h2>Key Formulas</h2>
      <p><strong>Normal Force:</strong> N = mg</p>
      <p><strong>Friction:</strong> F = μN</p>
      <p><strong>Net Force:</strong> F_net = F_applied − F_friction</p>

      <hr style={{ margin: "30px 0" }} />

      <h2>Interactive Simulation</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Mass: {mass} kg</label><br />
        <input
          type="range"
          min="1"
          max="20"
          value={mass}
          onChange={(e) => setMass(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Applied Force: {appliedForce} N</label><br />
        <input
          type="range"
          min="0"
          max="150"
          value={appliedForce}
          onChange={(e) => setAppliedForce(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Coefficient of Friction (μ): {mu}</label><br />
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={mu}
          onChange={(e) => setMu(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
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
        width={1100}
        height={550}
        style={{
          border: "2px solid #ddd",
          backgroundColor: "#ffffff",
          borderRadius: "12px"
        }}
      />
    </div>
  );
}
