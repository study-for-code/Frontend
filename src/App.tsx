import { Routes, Route } from "react-router-dom";

// pages
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Singup from "@/pages/Singnup/Singup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
      </Routes>
    </div>
  );
};

export default App;
