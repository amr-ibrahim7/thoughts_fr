import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
    );

  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
