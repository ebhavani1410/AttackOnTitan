import { useState } from "react";
import ProjectileSim from "./ProjectileSim";

export default function AIPhysicsEngine() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const parseInput = (text) => {
    text = text.toLowerCase();

    let velocity = 20;
    let angle = 45;

    const vMatch = text.match(/(\d+)\s*m\/s/);
    if (vMatch) velocity = parseFloat(vMatch[1]);

    const aMatch = text.match(/(\d+)\s*degree/);
    if (aMatch) angle = parseFloat(aMatch[1]);

    return { velocity, angle };
  };

  const handleGenerate = () => {
    const parsed = parseInput(input);
    setResult(parsed);
  };

  return (
    <div className="ai-box">
      <h3>AI Physics Engine</h3>
      <textarea
        placeholder="Type a physics problem..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate Simulation</button>

      {result && (
        <ProjectileSim velocity={result.velocity} angle={result.angle} />
      )}
    </div>
  );
}
