import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { authAPI } from "../services/api";
import React from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const response = await axios.get("/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          setUser(response.data);
          setToken(storedToken);
          console.log("User verified:", response.data);
          console.log("Token:", storedToken);

          setIsAuthenticated(true);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;
        } catch (error) {
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
          setIsAuthenticated(false);
          delete axios.defaults.headers.common["Authorization"];
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { data: token } = response;

      setToken(token);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      return { success: true, message: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
