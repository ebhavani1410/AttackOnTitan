import { useState, useEffect, useRef } from "react";

export default function VerticalMotion() {
  const [initialVelocity, setInitialVelocity] = useState(30);
  const [gravity, setGravity] = useState(9.8);
  const [speed, setSpeed] = useState(1);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let startTime = null;

    const ground = canvas.height - 40;
    const scale = 5;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const t = ((timestamp - startTime) / 1000) * speed;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ground
      ctx.beginPath();
      ctx.moveTo(0, ground);
      ctx.lineTo(canvas.width, ground);
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Physics equation
      const y = initialVelocity * t - 0.5 * gravity * t * t;
      const pixelY = ground - y * scale;

      if (pixelY <= ground) {
        ctx.fillStyle = "#ff5722";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, pixelY, 15, 0, Math.PI * 2);
        ctx.fill();

        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [initialVelocity, gravity, speed]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Vertical Motion</h1>

      <p><strong>Equation:</strong> y = ut − ½gt²</p>

      <div style={{ marginBottom: "20px" }}>
        <label>Initial Velocity (m/s): {initialVelocity}</label>
        <br />
        <input
          type="range"
          min="10"
          max="100"
          value={initialVelocity}
          onChange={(e) => setInitialVelocity(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Gravity (m/s²): {gravity}</label>
        <br />
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
        <label>Animation Speed: {speed}x</label>
        <br />
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
        width={800}
        height={400}
        style={{
          border: "2px solid #ddd",
          backgroundColor: "#ffffff",
          borderRadius: "10px"
        }}
      />
    </div>
  );
}
