import { createContext, useContext, useEffect, useState } from "react";

import { fetchUserProfile, loginUser, registerUser } from "../api/userServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialAuth = async () => {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        try {
          const userProfile = await fetchUserProfile();
          setUser(userProfile.data);
          setError(null);
        } catch (error) {
          console.error("Failed to fetch user profile",error);
          setError("Failed to fetch user profile");
          logout();
        }
      }
      setLoading(false);
    };
    initialAuth();
  }, []);

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(userData);
      setUser(response.data);
      localStorage.setItem("accessToken", response.accessToken);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to register");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(credentials);
      setUser(response.data);
      localStorage.setItem("accessToken", response.accessToken);
      setError(null);
    } catch (err) {
      setError(err.message || "Invalid email or password");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("accessToken");
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to logout",error);
      localStorage.removeItem("accessToken");
      setUser(null);
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        login,
        logout,
        register,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
