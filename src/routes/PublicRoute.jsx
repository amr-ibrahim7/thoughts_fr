import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="size-16 rounded-full border-[10px] border-gray-300 border-r-blue-800 animate-spin"></div>
      </div>
    );

  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
