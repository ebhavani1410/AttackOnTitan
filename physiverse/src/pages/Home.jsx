import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const topics = [
  { name: "Laws of Motion", path: "laws" },
  { name: "Vertical Motion", path: "vertical" },
  { name: "Work & Energy", path: "work" },
  { name: "Projectile Motion", path: "projectile" },
  { name: "Thermodynamics", path: "thermo" },
  { name: "Circular Motion", path: "circular" }
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
            onClick={() => navigate(`/topic/${topic.path}`)}
            
          >
            <h3>{topic.name}</h3>

            <p>Explore →</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
