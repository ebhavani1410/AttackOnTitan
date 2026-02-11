import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LawsOfMotion from "./pages/LawsOfMotion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic/laws" element={<LawsOfMotion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
