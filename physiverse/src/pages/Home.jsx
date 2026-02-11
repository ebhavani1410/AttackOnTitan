import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const topics = [
    "Laws of Motion",
    "Vertical Motion",
    "Work & Energy",
    "Projectile Motion",
    "Thermodynamics",
    "Circular Motion"
  ];

  return (
    <div className="container">
      <h1>Welcome to The World Of Science</h1>
      <p className="subtitle">
        Explore the fascinating world of science and technology through interactive lessons.
      </p>

      <div className="card-grid">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="card"
            onClick={() => navigate(`/topic/${topic}`)}
          >
            <h3>{topic}</h3>
            <p>Explore →</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
