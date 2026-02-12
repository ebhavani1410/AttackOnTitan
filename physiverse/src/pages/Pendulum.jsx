import { useState, useEffect, useRef } from "react";

export default function Pendulum() {
  const [length, setLength] = useState(200); // pixels
  const [gravity, setGravity] = useState(9.8);
  const [angle, setAngle] = useState(30); // degrees
  const [speed, setSpeed] = useState(1);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let startTime = null;

    const pivotX = canvas.width / 2;
    const pivotY = 80;

    const radians = (angle * Math.PI) / 180;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const t = ((timestamp - startTime) / 1000) * speed;

      const omega = Math.sqrt(gravity / (length / 100)); 
      const theta = radians * Math.cos(omega * t);

      const bobX = pivotX + length * Math.sin(theta);
      const bobY = pivotY + length * Math.cos(theta);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw pivot point
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Draw string
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw bob
      ctx.beginPath();
      ctx.arc(bobX, bobY, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#ff5722";
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [length, gravity, angle, speed]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Simple Pendulum Simulation</h1>

      <p>
        θ(t) = θ₀ cos( √(g/L) t )
      </p>

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
        width={900}
        height={500}
        style={{
          border: "2px solid #ddd",
          backgroundColor: "#ffffff",
          borderRadius: "10px"
        }}
      />
    </div>
  );
}
