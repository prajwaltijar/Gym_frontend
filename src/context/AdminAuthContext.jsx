import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // check token on refresh
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) setIsAuthenticated(true);
    setLoading(false);
  }, []); 
  // 🔐 REAL LOGIN (backend)
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      const token = res.data.token;

      localStorage.setItem("adminToken", token);
      setIsAuthenticated(true);

      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
