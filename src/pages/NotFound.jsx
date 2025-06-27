import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, ArrowRight, AlertCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
          <div className="w-full max-w-lg">
            <Card className="bg-background/50 border-2 border-border/50 rounded-2xl shadow-2xl shadow-primary/5 backdrop-blur-sm">
              <CardHeader className="text-center pb-8 pt-10">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-red-500 to-red-400 shadow-lg">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <div className="mb-4">
                  <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent mb-2">
                    404
                  </h1>
                </div>
                
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  Page Not Found
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground leading-relaxed">
                  We're sorry for the inconvenience. It looks like you're trying to
                  access a page that has been deleted or never existed.
                </CardDescription>

                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mt-4"></div>
              </CardHeader>
              
              <CardContent className="px-10 pb-8">
                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Don't worry, let's get you back on track!
                  </p>
                  <Link to="/" className="block">
                    <Button className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl font-medium text-base shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4" />
                        <span>Back to Home</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Button>
                  </Link>
                </div>
              </CardContent>
              
              <CardFooter className="px-10 pb-10">
                <div className="flex items-center w-full mb-6">
                  <div className="flex-1 h-px bg-border/50"></div>
                  <span className="px-4 text-sm text-muted-foreground">Need help?</span>
                  <div className="flex-1 h-px bg-border/50"></div>
                </div>
                <div className="w-full text-center space-y-3">
                  <p className="text-sm text-muted-foreground">
                    If you believe this is an error, please{" "}
                    <Link 
                      to="/contact" 
                      className="text-primary hover:text-primary/80 hover:underline transition-colors"
                    >
                      contact support
                    </Link>
                  </p>
                </div>
              </CardFooter>
            </Card>
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                Error Code: 404 - Page Not Found
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;