import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center gap-6 justify-center min-h-screen bg-gray-50 p-5">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-gray-800 mb-4">
          404
        </h1>
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h3>
        <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
          We're sorry for the inconvenience. It looks like you're trying to
          access a page that has been deleted or never existed.
        </p>
      </div>
      <Link to="/">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
