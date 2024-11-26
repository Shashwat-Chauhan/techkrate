// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Apply from "./pages/Apply";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
    </Router>
  );
}

export default App;
