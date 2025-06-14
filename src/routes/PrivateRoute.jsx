import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="size-16 rounded-full border-[10px] border-gray-300 border-r-blue-800 animate-spin"></div>
      </div>
    );

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
