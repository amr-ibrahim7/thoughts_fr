import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, User, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, error, loading } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      if (!error) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
          {/* Main Card */}
          <div className="w-full max-w-lg">
            <Card className="bg-background/50 border-2 border-border/50 rounded-2xl shadow-2xl shadow-primary/5 backdrop-blur-sm">
              <CardHeader className="text-center pb-8 pt-10">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-primary to-primary/80 shadow-lg">
                  <UserPlus className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  Create Account
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground leading-relaxed">
                  Join our community and start sharing your stories
                </CardDescription>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-4"></div>
              </CardHeader>
              
              <CardContent className="px-10 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-12 bg-background/50 border-2 border-border/50 focus:border-primary/50 rounded-xl px-4 text-base transition-all duration-300 hover:border-border focus:ring-0"
                    />
                  </div>
                  
                  {/* Email Field */}
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 bg-background/50 border-2 border-border/50 focus:border-primary/50 rounded-xl px-4 text-base transition-all duration-300 hover:border-border focus:ring-0"
                    />
                  </div>
                  
                  {/* Password Field */}
                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Lock className="w-4 h-4 text-primary" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 bg-background/50 border-2 border-border/50 focus:border-primary/50 rounded-xl px-4 pr-12 text-base transition-all duration-300 hover:border-border focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        {showPassword ? (
                          <Eye className="h-5 w-5" />
                        ) : (
                          <EyeOff className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    
                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mt-3">
                        <p className="text-red-600 text-sm font-medium">{error}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl font-medium text-base shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 mt-8"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"></div>
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Create Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
              
              <CardFooter className="px-10 pb-10">
                {/* Divider */}
                <div className="flex items-center w-full mb-6">
                  <div className="flex-1 h-px bg-border/50"></div>
                  <span className="px-4 text-sm text-muted-foreground">Already have an account?</span>
                  <div className="flex-1 h-px bg-border/50"></div>
                </div>
                
                {/* Sign In Link */}
                <div className="w-full text-center">
                  <Link 
                    to="/login" 
                    className="inline-flex items-center gap-2 px-6 py-3 text-primary hover:text-primary/80 font-medium transition-all duration-300 hover:bg-primary/5 rounded-xl"
                  >
                    <span>Sign in to your account</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardFooter>
            </Card>
            
            {/* Additional Info */}
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-primary hover:text-primary/80 hover:underline transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:text-primary/80 hover:underline transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;