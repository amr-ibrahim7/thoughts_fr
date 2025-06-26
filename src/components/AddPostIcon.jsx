import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const AddPostIcon = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <Link 
        to="/addpost"
        className="group relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <Plus className="w-7 h-7 transition-transform duration-300 group-hover:rotate-90" />
        <div className="absolute right-full mr-4 px-4 py-2 bg-background/95 backdrop-blur-sm border-2 border-border/50 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
          <span className="text-sm font-semibold text-foreground">Create New Post</span>
          <div className="absolute top-1/2 left-full -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-background/95 border-y-[6px] border-y-transparent"></div>
        </div>
        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 group-hover:opacity-0 transition-all duration-500"></div>
      </Link>
    </div>
  );
};

export default AddPostIcon;