import { Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
