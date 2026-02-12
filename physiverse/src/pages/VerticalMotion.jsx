import { useState, useEffect, useRef } from "react";

export default function VerticalMotion() {
  const [initialVelocity, setInitialVelocity] = useState(40);
  const [gravity, setGravity] = useState(9.8);
  const [speed, setSpeed] = useState(1);

  const [inputText, setInputText] = useState("");

  const canvasRef = useRef(null);

  const maxHeight = (initialVelocity * initialVelocity) / (2 * gravity);
  const timeOfFlight = (2 * initialVelocity) / gravity;

  // 🔥 NLP PARSER
  const parseInput = () => {
    const text = inputText.toLowerCase();

    const vMatch = text.match(/(\d+)\s*m\/?s/);
    if (vMatch) setInitialVelocity(parseFloat(vMatch[1]));

    const gMatch = text.match(/(\d+\.?\d*)\s*m\/?s²?/);
    if (gMatch) setGravity(parseFloat(gMatch[1]));

    // If user writes "moon gravity"
    if (text.includes("moon")) {
      setGravity(1.6);
    }

    // If user writes "earth"
    if (text.includes("earth")) {
      setGravity(9.8);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let startTime = null;

    const ground = canvas.height - 60;
    const scale = 4;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const t = ((timestamp - startTime) / 1000) * speed;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ground
      ctx.beginPath();
      ctx.moveTo(0, ground);
      ctx.lineTo(canvas.width, ground);
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Physics
      const y = initialVelocity * t - 0.5 * gravity * t * t;
      const pixelY = ground - y * scale;

      if (pixelY <= ground) {
        ctx.fillStyle = "#ff5722";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, pixelY, 20, 0, Math.PI * 2);
        ctx.fill();

        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [initialVelocity, gravity, speed]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>🧠 Vertical Motion (AI Enabled)</h1>

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
          placeholder="Example: A ball is thrown upward with 50 m/s on moon"
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

      {/* THEORY */}

      <h2>Key Equations</h2>
      <p><strong>Displacement:</strong> y = ut − ½gt²</p>
      <p><strong>Maximum Height:</strong> H = u² / 2g</p>
      <p><strong>Time of Flight:</strong> T = 2u / g</p>

      <h3>Calculated Values</h3>
      <p>Maximum Height = {maxHeight.toFixed(2)} m</p>
      <p>Time of Flight = {timeOfFlight.toFixed(2)} s</p>

      <hr style={{ margin: "30px 0" }} />

      <h2>Interactive Simulation</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Initial Velocity (m/s): {initialVelocity}</label><br />
        <input
          type="range"
          min="10"
          max="120"
          value={initialVelocity}
          onChange={(e) => setInitialVelocity(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Gravity (m/s²): {gravity}</label><br />
        <input
          type="range"
          min="1"
          max="20"
          step="0.1"
          value={gravity}
          onChange={(e) => setGravity(Number(e.target.value))}
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
        width={1000}
        height={600}
        style={{
          border: "2px solid #ddd",
          backgroundColor: "#ffffff",
          borderRadius: "12px"
        }}
      />
    </div>
  );
}
