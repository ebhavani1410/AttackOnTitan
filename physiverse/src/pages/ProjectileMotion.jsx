import { useState, useEffect, useRef } from "react";

export default function ProjectileMotion() {
  const [velocity, setVelocity] = useState(50);
  const [angle, setAngle] = useState(45);
  const [gravity, setGravity] = useState(9.8);
  const [speed, setSpeed] = useState(1);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let startTime = null;

    const ground = canvas.height - 50;
    const scale = 4;

    const radians = (angle * Math.PI) / 180;
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
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.stroke();

      const x = vx * t;
      const y = vy * t - 0.5 * gravity * t * t;

      const pixelX = x * scale + 50;
      const pixelY = ground - y * scale;

      if (pixelY <= ground && pixelX <= canvas.width) {
        ctx.fillStyle = "#ff5722";
        ctx.beginPath();
        ctx.arc(pixelX, pixelY, 12, 0, Math.PI * 2);
        ctx.fill();

        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [velocity, angle, gravity, speed]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Projectile Motion</h1>

      <p>
        <strong>Equations:</strong><br />
        x = u cos(θ) t <br />
        y = u sin(θ) t − ½gt²
      </p>

      <div style={{ marginBottom: "15px" }}>
        <label>Initial Velocity: {velocity} m/s</label><br />
        <input
          type="range"
          min="10"
          max="100"
          value={velocity}
          onChange={(e) => setVelocity(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Angle: {angle}°</label><br />
        <input
          type="range"
          min="10"
          max="80"
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
        width={900}
        height={450}
        style={{
          border: "2px solid #ddd",
          backgroundColor: "#ffffff",
          borderRadius: "10px"
        }}
      />
    </div>
  );
}
