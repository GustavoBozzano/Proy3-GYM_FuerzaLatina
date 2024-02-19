import { createContext, useEffect, useState } from "react";
import Auth from "../utils/auth";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setUser(response.data.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
  };

  useEffect(() => {
    if (Auth.loggedIn()) {
      const profile = Auth.getProfile();
      fetchUserProfile(profile.id);
    }
  }, []);

  const login = async (token) => {
    Auth.login(token);
    const profile = Auth.getProfile();
    await fetchUserProfile(profile.id);
  };

  const logout = () => {
    Auth.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
