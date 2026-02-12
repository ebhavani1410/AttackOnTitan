import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LawsOfMotion from "./pages/LawsOfMotion";
import VerticalMotion from "./pages/VerticalMotion";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic/laws" element={<LawsOfMotion />} />
        <Route path="/topic/vertical" element={<VerticalMotion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
