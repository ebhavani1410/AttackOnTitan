import { useState, useEffect, useRef } from "react";

export default function ProjectileMotion() {
  const [velocity, setVelocity] = useState(60);
  const [angle, setAngle] = useState(45);
  const [gravity, setGravity] = useState(9.8);
  const [speed, setSpeed] = useState(1);

  const [inputText, setInputText] = useState("");

  const canvasRef = useRef(null);

  // 🔥 NLP Parser
  const parseInput = () => {
    const text = inputText.toLowerCase();

    const vMatch = text.match(/(\d+)\s*m\/?s/);
    if (vMatch) setVelocity(parseFloat(vMatch[1]));

    const aMatch = text.match(/(\d+)\s*degree/);
    if (aMatch) setAngle(parseFloat(aMatch[1]));

    if (text.includes("straight up") || text.includes("vertically")) {
      setAngle(90);
    }
  };

  const radians = (angle * Math.PI) / 180;

  const timeOfFlight = (2 * velocity * Math.sin(radians)) / gravity;
  const maxHeight =
    (velocity * velocity * Math.sin(radians) * Math.sin(radians)) /
    (2 * gravity);
  const range =
    (velocity * velocity * Math.sin(2 * radians)) / gravity;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let startTime = null;

    const ground = canvas.height - 70;
    const scale = 3.5;

    const vx = velocity * Math.cos(radians);
    const vy = velocity * Math.sin(radians);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const t = ((timestamp - startTime) / 1000) * speed;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ground
      ctx.beginPath();
      ctx.moveTo(0, ground);
      ctx.lineTo(canvas.width, ground);
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 3;
      ctx.stroke();

      const x = vx * t;
      const y = vy * t - 0.5 * gravity * t * t;

      const pixelX = x * scale + 50;
      const pixelY = ground - y * scale;

      if (pixelY <= ground && pixelX <= canvas.width) {
        ctx.fillStyle = "#ff5722";
        ctx.beginPath();
        ctx.arc(pixelX, pixelY, 18, 0, Math.PI * 2);
        ctx.fill();

        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [velocity, angle, gravity, speed]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>🧠 Projectile Motion (AI Enabled)</h1>

      {/* 🔥 NLP SECTION */}
      <div style={{
        background: "#f5f7fa",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "30px"
      }}>
        <h2>Enter Physics Word Problem</h2>

        <input
          type="text"
          placeholder="Example: A ball is thrown at 30 degree with 50 m/s"
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

      <h2>Key Equations</h2>
      <p><strong>Time of Flight:</strong> T = 2u sin(θ) / g</p>
      <p><strong>Maximum Height:</strong> H = u² sin²(θ) / 2g</p>
      <p><strong>Range:</strong> R = u² sin(2θ) / g</p>

      <h3>Calculated Values</h3>
      <p>Time of Flight = {timeOfFlight.toFixed(2)} s</p>
      <p>Maximum Height = {maxHeight.toFixed(2)} m</p>
      <p>Range = {range.toFixed(2)} m</p>

      <hr style={{ margin: "30px 0" }} />

      {/* SIMULATION SECTION */}

      <h2>Interactive Simulation</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Initial Velocity: {velocity} m/s</label><br />
        <input
          type="range"
          min="10"
          max="120"
          value={velocity}
          onChange={(e) => setVelocity(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Angle: {angle}°</label><br />
        <input
          type="range"
          min="10"
          max="90"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
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
        height={650}
        style={{
          border: "2px solid #ddd",
          backgroundColor: "#ffffff",
          borderRadius: "12px"
        }}
      />
    </div>
  );
}
