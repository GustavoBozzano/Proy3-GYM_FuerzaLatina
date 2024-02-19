import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile";
import NewExercise from "../components/Exercise/NewExercise/NewExercise";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="profile" element={<Profile />} />
      <Route path="NewExercise" element={<NewExercise />} />
    </Routes>
  );
};

export default AuthRoutes;
