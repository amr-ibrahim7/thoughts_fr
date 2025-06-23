import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Link } from "react-router";
import logoDa from "../assets/darkL.png";
import logoLi from "../assets/whiteL.png";

import { SquarePen, Sun, Moon, Monitor, User, BookOpen, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
// import { useTheme } from "..context/ThemeProvider";
import { getNameInitials } from "../utils/stringUtil";
import { useTheme } from "../context/ThemeProvider";

export default function Nav() {
  const { user, loading, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  
  console.log(user, loading, logout);
  
  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 md:px-8 lg:px-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              onClick={ScrollToTop}
              className="flex items-center space-x-2 transition-opacity hover:opacity-80"
            >
              <img 
                src={theme === "light" ?  logoLi : logoDa} 
                alt="Logo" 
                className="h-8 w-auto md:h-10"
              />
            </Link>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                >
                  {getThemeIcon()}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="cursor-pointer"
                >
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="cursor-pointer"
                >
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className="cursor-pointer"
                >
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Add Post Button - Only for logged in users */}
            {user && (
              <Button 
                asChild 
                variant="ghost" 
                size="sm"
                className="hidden md:inline-flex hover:bg-accent hover:text-accent-foreground"
              >
                <Link
                  to="/addpost"
                  onClick={ScrollToTop}
                  className="flex items-center gap-2"
                >
                  <SquarePen className="h-4 w-4" strokeWidth={1.5} />
                  Add Post
                </Link>
              </Button>
            )}

            {/* User Menu or Login */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-9 w-9 rounded-full hover:bg-accent"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.profilePicture}
                        className="object-cover"
                        alt={user.name}
                      />
                      <AvatarFallback className="text-sm font-medium">
                        {getNameInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56" 
                  align="end" 
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuGroup>
                    {/* Mobile Add Post - Only show on mobile */}
                    <div className="md:hidden">
                      <Link to="/addpost">
                        <DropdownMenuItem 
                          onClick={ScrollToTop} 
                          className="cursor-pointer"
                        >
                          <SquarePen className="mr-2 h-4 w-4" strokeWidth={1.5} />
                          Add Post
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                    </div>
                    
                    <Link to="/myposts">
                      <DropdownMenuItem 
                        onClick={ScrollToTop}
                        className="cursor-pointer"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        My Blogs
                      </DropdownMenuItem>
                    </Link>
                    
                    <Link to="/profile">
                      <DropdownMenuItem 
                        onClick={ScrollToTop}
                        className="cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                    }}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : loading ? (
              <Skeleton className="h-8 w-8 rounded-full" />
            ) : (
              <Button 
                asChild 
                variant="outline"
                size="sm"
                className="hover:bg-accent hover:text-accent-foreground"
              >
                <Link to="/login" onClick={ScrollToTop}>
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}