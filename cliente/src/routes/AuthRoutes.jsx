import { Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Activate from "../components/auth/Activate";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="activate/:activationCode" element={<Activate />} />
    </Routes>
  );
};

export default AuthRoutes;
