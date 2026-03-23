import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── Create the context ───────────────────────────────────
const AuthContext = createContext(null);

// ─── Provider: wraps the whole app ───────────────────────
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Convenience helpers
  const isAdmin    = user?.role === "admin";
  const isCustomer = user?.role === "customer";
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isCustomer, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook: use anywhere in the app ───────────────────────
export const useAuth = () => useContext(AuthContext);
