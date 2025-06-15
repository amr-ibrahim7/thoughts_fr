import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import logo from "../assets/darkL.png";

import { SquarePen } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getNameInitials } from "../utils/stringUtil";

export default function Nav() {
  const { user, loading, logout } = useAuth();
  console.log(user, loading, logout);
  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <nav className="flex items-center justify-between p-5 sticky top-0 z-10 md:px-[60px] lg:px-[120px] lg:py-5 shadow-md bg-[#14293b]">
        <div className="flex items-center justify-center w-32 md:w-44 lg:w-52">
          <Link to="/" onClick={ScrollToTop}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          {user && (
            <div className="lg:flex items-center space-x-4">
              <Link
                to="/addpost"
                onClick={ScrollToTop}
                className="flex gap-2 text-white"
              >
                <SquarePen strokeWidth={1.5} />
                Add A Post
              </Link>
            </div>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-7 w-7 md:h-9 md:w-9">
                  <AvatarImage
                    src={user.profilePicture}
                    className="object-cover w-full h-full"
                  />
                  <AvatarFallback>{getNameInitials(user.name)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link to="/myposts">
                    <DropdownMenuItem onClick={ScrollToTop}>
                      My Blogs
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/profile">
                    <DropdownMenuItem onClick={ScrollToTop}>
                      Profile
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : loading ? (
            <Skeleton className="h-7 w-7 md:h-9 md:w-9 rounded-full" />
          ) : (
            <Link
              to="/login"
              onClick={ScrollToTop}
              className="text-white hover:bg-accent hover:text-primary px-4 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
