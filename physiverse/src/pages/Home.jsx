import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const topics = [
    "Projectile Motion",
    "Laws of Motion",
    "Work & Energy",
    "Thermodynamics",
    "Electromagnetism",
    "Quantum Physics",
    "Fluid Mechanics",
    "Waves & Sound",
    "Optics"
  ];

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", color: "#00E5FF" }}>
        Welcome to Physiverse
      </h1>

      <p style={{ textAlign: "center", opacity: 0.7 }}>
        Explore the fascinating world of physics through interactive lessons and simulations.
      </p>

      <div className="grid">
        {topics.map((topic) => (
          <div
            key={topic}
            className="card"
            onClick={() => navigate(`/topic/${topic}`)}
          >
            <h3>{topic}</h3>
            <p style={{ opacity: 0.6 }}>Start Learning →</p>
          </div>
        ))}
      </div>
    </div>
  );
}
