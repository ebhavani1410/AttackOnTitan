import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Topic from "./pages/Topic";
import Lesson from "./pages/Lesson";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic/:name" element={<Topic />} />
        <Route path="/lesson/:name" element={<Lesson />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
