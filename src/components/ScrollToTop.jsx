import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showBtn && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={goToTop}
            className="group relative flex items-center justify-center w-14 h-14 bg-background/80 backdrop-blur-sm border-2 border-border/50 hover:border-primary/50 text-foreground hover:text-primary rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <ChevronUp className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" />
            
         
            <div className="absolute right-full mr-3 px-3 py-2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
              <span className="text-sm font-medium text-foreground">Back to Top</span>
              <div className="absolute top-1/2 left-full -translate-y-1/2 w-0 h-0 border-l-4 border-l-background/95 border-y-4 border-y-transparent"></div>
            </div>
            <div className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-all duration-300"></div>
            
            <div className="absolute inset-0 rounded-full ring-2 ring-primary/20 scale-0 group-focus:scale-110 transition-all duration-300"></div>
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;