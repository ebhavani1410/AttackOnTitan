import { useState, useEffect, useRef } from "react";

export default function LawsOfMotion() {
  const [mass, setMass] = useState(5);
  const [force, setForce] = useState(20);
  const [time, setTime] = useState(5);
  const [speed, setSpeed] = useState(1);

  const [inputText, setInputText] = useState("");

  const canvasRef = useRef(null);

  const acceleration = force / mass;

  // 🔥 NLP PARSER
  const parseInput = () => {
    const text = inputText.toLowerCase();

    const mMatch = text.match(/(\d+)\s*kg/);
    if (mMatch) setMass(parseFloat(mMatch[1]));

    const fMatch = text.match(/(\d+)\s*n/);
    if (fMatch) setForce(parseFloat(fMatch[1]));

    const tMatch = text.match(/(\d+)\s*s/);
    if (tMatch) setTime(parseFloat(tMatch[1]));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let startTime = null;

    const ground = canvas.height - 80;
    const scale = 15;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = ((timestamp - startTime) / 1000) * speed;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ground
      ctx.beginPath();
      ctx.moveTo(0, ground);
      ctx.lineTo(canvas.width, ground);
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Physics
      const displacement = 0.5 * acceleration * elapsed * elapsed;
      const x = Math.min(displacement * scale, canvas.width - 100);

      // Block
      ctx.fillStyle = "#0077ff";
      ctx.fillRect(x, ground - 60, 100, 60);

      // Display displacement
      ctx.fillStyle = "#000";
      ctx.font = "20px Arial";
      ctx.fillText(`Displacement: ${displacement.toFixed(2)} m`, 40, 40);

      if (elapsed < time) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [mass, force, time, speed]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>🧠 Newton's Laws of Motion (AI Enabled)</h1>

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
          placeholder="Example: A 4 kg object is pushed with 40 N for 6 s"
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

      {/* THEORY SECTION */}

      <h2>Second Law</h2>
      <p><strong>Formula:</strong> F = m × a</p>
      <p><strong>Acceleration:</strong> a = F / m</p>

      <h3>Calculated Acceleration</h3>
      <p>Acceleration = {acceleration.toFixed(2)} m/s²</p>

      <hr style={{ margin: "30px 0" }} />

      <h2>Interactive Simulation</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Mass (kg): {mass}</label><br />
        <input
          type="range"
          min="1"
          max="20"
          value={mass}
          onChange={(e) => setMass(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Force (N): {force}</label><br />
        <input
          type="range"
          min="1"
          max="150"
          value={force}
          onChange={(e) => setForce(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Simulation Time (s): {time}</label><br />
        <input
          type="range"
          min="1"
          max="10"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Animation Speed: {speed}x</label><br />
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>

      <canvas
        ref={canvasRef}
        width={1100}
        height={500}
        style={{
          border: "2px solid #ddd",
          background: "#ffffff",
          borderRadius: "12px"
        }}
      />
    </div>
  );
}
