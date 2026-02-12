import { useState, useEffect, useRef } from "react";

export default function Pendulum() {
  const [length, setLength] = useState(200); // pixels
  const [gravity, setGravity] = useState(9.8);
  const [angle, setAngle] = useState(30);
  const [speed, setSpeed] = useState(1);

  const [inputText, setInputText] = useState("");

  const canvasRef = useRef(null);

  const lengthInMeters = length / 100;
  const timePeriod = 2 * Math.PI * Math.sqrt(lengthInMeters / gravity);

  // 🔥 NLP PARSER
  const parseInput = () => {
    const text = inputText.toLowerCase();

    // Length in meters (convert to pixels scale)
    const lMatch = text.match(/(\d+)\s*m/);
    if (lMatch) {
      const meters = parseFloat(lMatch[1]);
      setLength(meters * 100); // scale to pixels
    }

    // Gravity
    const gMatch = text.match(/(\d+\.?\d*)\s*m\/?s²?/);
    if (gMatch) setGravity(parseFloat(gMatch[1]));

    // Angle
    const aMatch = text.match(/(\d+)\s*degree/);
    if (aMatch) setAngle(parseFloat(aMatch[1]));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let startTime = null;

    const pivotX = canvas.width / 2;
    const pivotY = 100;

    const radians = (angle * Math.PI) / 180;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const t = ((timestamp - startTime) / 1000) * speed;

      const omega = Math.sqrt(gravity / lengthInMeters);
      const theta = radians * Math.cos(omega * t);

      const bobX = pivotX + length * Math.sin(theta);
      const bobY = pivotY + length * Math.cos(theta);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Pivot
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2);
      ctx.fill();

      // String
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Bob
      ctx.beginPath();
      ctx.arc(bobX, bobY, 22, 0, Math.PI * 2);
      ctx.fillStyle = "#ff5722";
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [length, gravity, angle, speed]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>🧠 Simple Pendulum (AI Enabled)</h1>

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
          placeholder="Example: A pendulum of length 2 m oscillates at 30 degree in 9.8 m/s² gravity"
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

      <h2>Key Equations</h2>
      <p><strong>Angular Displacement:</strong> θ(t) = θ₀ cos(√(g/L) t)</p>
      <p><strong>Time Period:</strong> T = 2π √(L/g)</p>

      <h3>Calculated Time Period</h3>
      <p>Time Period (T) = {timePeriod.toFixed(2)} s</p>

      <hr style={{ margin: "30px 0" }} />

      <h2>Interactive Simulation</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Length: {length} px</label><br />
        <input
          type="range"
          min="100"
          max="350"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Gravity: {gravity} m/s²</label><br />
        <input
          type="range"
          min="1"
          max="20"
          step="0.1"
          value={gravity}
          onChange={(e) => setGravity(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Initial Angle: {angle}°</label><br />
        <input
          type="range"
          min="5"
          max="60"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
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
