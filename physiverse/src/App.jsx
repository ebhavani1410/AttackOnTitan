import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LawsOfMotion from "./pages/LawsOfMotion";
import VerticalMotion from "./pages/VerticalMotion";
import ProjectileMotion from "./pages/ProjectileMotion";
import Pendulum from "./pages/Pendulum";
import CircularMotion from "./pages/CircularMotion";
import Collision from "./pages/Collision";
import Friction from "./pages/Friction";

// 🔥 Import AI Engine
import AIPhysicsEngine from "./components/AIPhysicsEngine";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Topics */}
        <Route path="/topic/laws" element={<LawsOfMotion />} />
        <Route path="/topic/vertical" element={<VerticalMotion />} />
        <Route path="/topic/projectile" element={<ProjectileMotion />} />
        <Route path="/topic/pendulum" element={<Pendulum />} />
        <Route path="/topic/circular" element={<CircularMotion />} />
        <Route path="/topic/collision" element={<Collision />} />
        <Route path="/topic/friction" element={<Friction />} />

        {/* 🔥 AI Engine Route */}
        <Route path="/ai" element={<AIPhysicsEngine />} />

        {/* Optional: 404 Fallback */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
