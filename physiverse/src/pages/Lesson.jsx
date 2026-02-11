import { useParams } from "react-router-dom";

export default function Lesson() {
  const { name } = useParams();

  return (
    <div className="container">
      <h1 style={{ color: "#00E5FF" }}>{name}</h1>

      <div
        style={{
          marginTop: "30px",
          background: "#111827",
          padding: "30px",
          borderRadius: "16px"
        }}
      >
        <p>
          This section will contain interactive explanations, AI-generated
          summaries, and simulation modules.
        </p>

        <h3 style={{ marginTop: "20px" }}>Interactive Simulation Area</h3>

        <div
          style={{
            height: "300px",
            background: "black",
            borderRadius: "12px",
            marginTop: "10px"
          }}
        />
      </div>
    </div>
  );
}
