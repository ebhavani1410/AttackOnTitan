import { useState, useEffect, useRef } from "react";

export default function LawsOfMotion() {
  const [mass, setMass] = useState(5);
  const [force, setForce] = useState(20);
  const [time, setTime] = useState(5);
  const canvasRef = useRef(null);

  const acceleration = force / mass;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Physics equations
      const displacement = 0.5 * acceleration * elapsed * elapsed;
      const x = Math.min(displacement * 20, canvas.width - 50);

      ctx.fillStyle = "#0077ff";
      ctx.fillRect(x, 80, 50, 50);

      if (elapsed < time) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [mass, force, time]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Laws of Motion</h1>

      <h2>Newton's Second Law</h2>
      <p>F = m × a</p>
      <p>Acceleration = {acceleration.toFixed(2)} m/s²</p>

      <div style={{ marginBottom: "20px" }}>
        <label>Mass (kg): {mass}</label>
        <input
          type="range"
          min="1"
          max="20"
          value={mass}
          onChange={(e) => setMass(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Force (N): {force}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={force}
          onChange={(e) => setForce(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Simulation Time (s): {time}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
        />
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        style={{
          border: "2px solid #ddd",
          background: "#f5f9ff",
          borderRadius: "10px"
        }}
      />
    </div>
  );
}
