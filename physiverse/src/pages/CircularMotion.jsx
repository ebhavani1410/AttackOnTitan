import { useState, useEffect, useRef } from "react";

export default function CircularMotion() {
  const [radius, setRadius] = useState(150);
  const [velocity, setVelocity] = useState(5);
  const [mass, setMass] = useState(2);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let startTime = null;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const t = ((timestamp - startTime) / 1000) * speedMultiplier;

      const omega = velocity / radius;
      const x = centerX + radius * Math.cos(omega * t);
      const y = centerY + radius * Math.sin(omega * t);

      const centripetalForce = (mass * velocity * velocity) / radius;
      const centripetalAcceleration = (velocity * velocity) / radius;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw circular path
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "#cccccc";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw center
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();

      // Draw radius line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw moving particle
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fillStyle = "#ff5722";
      ctx.fill();

      // Display live physics values
      ctx.fillStyle = "#000";
      ctx.font = "18px Arial";
      ctx.fillText(`ω = ${omega.toFixed(2)} rad/s`, 30, 30);
      ctx.fillText(`aₙ = ${centripetalAcceleration.toFixed(2)} m/s²`, 30, 60);
      ctx.fillText(`Fₙ = ${centripetalForce.toFixed(2)} N`, 30, 90);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [radius, velocity, mass, speedMultiplier]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Uniform Circular Motion</h1>

      <h2>Definition</h2>
      <p>
        Uniform circular motion is the motion of an object moving in a circular
        path at constant speed. Although speed is constant, velocity changes
        due to continuous change in direction.
      </p>

      <h2>Key Formulas</h2>
      <p><strong>Angular Velocity:</strong> ω = v / r</p>
      <p><strong>Centripetal Acceleration:</strong> aₙ = v² / r</p>
      <p><strong>Centripetal Force:</strong> Fₙ = mv² / r</p>
      <p><strong>Position:</strong> x = r cos(ωt), y = r sin(ωt)</p>

      <hr style={{ margin: "30px 0" }} />

      <h2>Interactive Simulation</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Radius: {radius}px</label><br />
        <input
          type="range"
          min="50"
          max="250"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Velocity: {velocity} m/s</label><br />
        <input
          type="range"
          min="1"
          max="20"
          value={velocity}
          onChange={(e) => setVelocity(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Mass: {mass} kg</label><br />
        <input
          type="range"
          min="1"
          max="10"
          value={mass}
          onChange={(e) => setMass(Number(e.target.value))}
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
        width={900}
        height={600}
        style={{
          border: "2px solid #ddd",
          backgroundColor: "#ffffff",
          borderRadius: "10px"
        }}
      />
    </div>
  );
}
