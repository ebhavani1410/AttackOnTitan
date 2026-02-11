import { useParams, useNavigate } from "react-router-dom";

export default function Topic() {
  const { name } = useParams();
  const navigate = useNavigate();

  const lessons = [
    "Introduction",
    "Concept & Theory",
    "Mathematical Formulation",
    "Worked Examples",
    "Practice Problems",
    "Advanced Applications"
  ];

  return (
    <div className="container">
      <h1 style={{ color: "#00E5FF" }}>{name}</h1>

      <h2 style={{ marginTop: "40px" }}>Lessons</h2>

      <div className="grid">
        {lessons.map((lesson, index) => (
          <div
            key={index}
            className="card"
            onClick={() => navigate(`/lesson/${name}-${lesson}`)}
          >
            <h3>{lesson}</h3>
            <p style={{ opacity: 0.6 }}>Open Lesson →</p>
          </div>
        ))}
      </div>
    </div>
  );
}
