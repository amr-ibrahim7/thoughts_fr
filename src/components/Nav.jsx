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
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import logoDa from "../assets/darkL.png";
import logoLi from "../assets/whiteL.png";

import { 
  SquarePen, 
  Sun, 
  Moon, 
  Monitor, 
  User, 
  BookOpen, 
  LogOut, 
  Search,
  X,
  Loader2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getNameInitials } from "../utils/stringUtil";
import { useTheme } from "../context/ThemeProvider";
import { usePost } from "../context/postContext";

export default function Nav() {
  const { user, loading, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  
  const { 
    searchPosts, 
    clearSearch, 
    searchQuery, 
    setSearchQuery,
    isSearching  
  } = usePost();
  
  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        searchPosts(searchQuery.trim());
      } else {
        clearSearch();
      }
    }, 500); 

    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
  };

  const clearSearchHandler = () => {
    setSearchQuery("");
    clearSearch();
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
      <nav className="sticky top-0 z-50 w-full border-b-2 border-border/30 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-lg shadow-primary/5">
        <div className="flex h-16 items-center justify-between px-4 md:px-8 lg:px-16 gap-4">
          <div className="flex items-center flex-shrink-0">
            <Link 
              to="/" 
              onClick={ScrollToTop}
              className="flex items-center space-x-2 transition-all duration-300 hover:opacity-80 hover:scale-105"
            >
              <img 
                src={theme === "light" ? logoLi : logoDa} 
                alt="Logo" 
                className="h-8 w-auto md:h-10 drop-shadow-sm"
              />
            </Link>
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-105' : ''}`}>
                {isSearching ? (
                  <Loader2 className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary animate-spin" />
                ) : (
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300" />
                )}
                
                <Input
                  type="text"
                  placeholder="Search posts, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  disabled={isSearching} 
                  className="w-full h-11 pl-12 pr-12 bg-background/60 border-2 border-border/50 focus:border-primary/50 rounded-full text-sm transition-all duration-300 hover:border-border focus:ring-0 focus:shadow-lg focus:shadow-primary/10 disabled:opacity-70"
                />
                
                {searchQuery && !isSearching && (
                  <button
                    type="button"
                    onClick={clearSearchHandler}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            
            {/* mobile search */}
            {/* <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-9 w-9 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9 hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105"
                >
                  {getThemeIcon()}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-40 bg-background/95 backdrop-blur-sm border-2 border-border/50 shadow-xl shadow-primary/10"
              >
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="cursor-pointer transition-all duration-300 hover:bg-accent/80"
                >
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="cursor-pointer transition-all duration-300 hover:bg-accent/80"
                >
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className="cursor-pointer transition-all duration-300 hover:bg-accent/80"
                >
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user && (
              <Button 
                asChild 
                variant="ghost" 
                size="sm"
                className="hidden md:inline-flex hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 px-4 py-2 rounded-xl"
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

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-9 w-9 rounded-full hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20 transition-all duration-300">
                      <AvatarImage
                        src={user.profilePicture}
                        className="object-cover"
                        alt={user.name}
                      />
                      <AvatarFallback className="text-sm font-medium bg-gradient-to-r from-primary/20 to-primary/10">
                        {getNameInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 bg-background/95 backdrop-blur-sm border-2 border-border/50 shadow-xl shadow-primary/10 rounded-xl" 
                  align="end" 
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal p-4">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm font-medium leading-none text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border/50" />
                  
                  <DropdownMenuGroup className="p-2">
                    <div className="md:hidden">
                      <Link to="/addpost">
                        <DropdownMenuItem 
                          onClick={ScrollToTop} 
                          className="cursor-pointer rounded-lg transition-all duration-300 hover:bg-accent/80"
                        >
                          <SquarePen className="mr-2 h-4 w-4" strokeWidth={1.5} />
                          Add Post
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator className="bg-border/50 my-2" />
                    </div>
                    
                    <Link to="/myposts">
                      <DropdownMenuItem 
                        onClick={ScrollToTop}
                        className="cursor-pointer rounded-lg transition-all duration-300 hover:bg-accent/80"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        My Blogs
                      </DropdownMenuItem>
                    </Link>
                    
                    <Link to="/profile">
                      <DropdownMenuItem 
                        onClick={ScrollToTop}
                        className="cursor-pointer rounded-lg transition-all duration-300 hover:bg-accent/80"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  
                  <DropdownMenuSeparator className="bg-border/50" />
                  
                  <div className="p-2">
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                      }}
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950 rounded-lg transition-all duration-300"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : loading ? (
              <Skeleton className="h-8 w-8 rounded-full" />
            ) : (
              <Button 
                asChild 
                variant="outline"
                size="sm"
                className="hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 px-6 py-2 rounded-xl border-2 border-border/50 hover:border-primary/50 shadow-sm hover:shadow-lg hover:shadow-primary/20"
              >
                <Link to="/login" onClick={ScrollToTop}>
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-105' : ''}`}>
              {isSearching ? (
                <Loader2 className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary animate-spin" />
              ) : (
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300" />
              )}
              
              <Input
                type="text"
                placeholder="Search posts, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                disabled={isSearching}
                className="w-full h-11 pl-12 pr-12 bg-background/60 border-2 border-border/50 focus:border-primary/50 rounded-full text-sm transition-all duration-300 hover:border-border focus:ring-0 focus:shadow-lg focus:shadow-primary/10 disabled:opacity-70"
              />
              
              {searchQuery && !isSearching && (
                <button
                  type="button"
                  onClick={clearSearchHandler} 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </nav>
    </>
  );
}