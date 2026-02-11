import { useEffect, useRef } from "react";

export default function ProjectileSim({ velocity, angle }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let t = 0;
    const g = 9.8;
    const rad = (angle * Math.PI) / 180;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const x = velocity * Math.cos(rad) * t;
      const y =
        velocity * Math.sin(rad) * t - 0.5 * g * t * t;

      ctx.beginPath();
      ctx.arc(x * 5, canvas.height - y * 5, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#0ea5e9";
      ctx.fill();

      if (canvas.height - y * 5 < canvas.height) {
        t += 0.05;
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [velocity, angle]);

  return (
    <div>
      <h4>Projectile Simulation</h4>
      <canvas ref={canvasRef} width={500} height={300} />
    </div>
  );
}
