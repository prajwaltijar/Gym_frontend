import { createContext, useContext, useEffect, useState } from "react";

const AdminAuthContext = createContext(null);

const ADMIN_USERNAME = "admin@gym.com";
const ADMIN_PASSWORD = "admin123";

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("pf_admin_authed");
    if (stored === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username, password) => {
    const ok =
      username.trim().toLowerCase() === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD;

    if (ok) {
      setIsAuthenticated(true);
      window.localStorage.setItem("pf_admin_authed", "true");
    }

    return ok;
  };

  const logout = () => {
    setIsAuthenticated(false);
    window.localStorage.removeItem("pf_admin_authed");
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return ctx;
};
