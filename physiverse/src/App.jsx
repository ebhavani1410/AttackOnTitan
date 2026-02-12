import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LawsOfMotion from "./pages/LawsOfMotion";
import VerticalMotion from "./pages/VerticalMotion";
import ProjectileMotion from "./pages/ProjectileMotion";
import Pendulum from "./pages/Pendulum";
import CircularMotion from "./pages/CircularMotion";
import Collision from "./pages/Collision";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic/laws" element={<LawsOfMotion />} />
        <Route path="/topic/vertical" element={<VerticalMotion />} />
        <Route path="/topic/projectile" element={<ProjectileMotion />} />
        <Route path="/topic/pendulum" element={<Pendulum />} />
        <Route path="/topic/circular" element={<CircularMotion />} />
        <Route path="/topic/collision" element={<Collision />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
