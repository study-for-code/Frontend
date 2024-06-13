import { Routes, Route } from "react-router-dom";

// pages
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Singup from "@/pages/Singnup/Singup";
import Admin from "./pages/Admin/Admin";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
