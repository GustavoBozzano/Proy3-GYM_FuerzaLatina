import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
axios.defaults.baseURL = "http://localhost:3001/";
function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
    </AuthProvider>
  );
}

export default App;
