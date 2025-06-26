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
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowRight, Shield } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, loading } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      if (!error) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
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
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground leading-relaxed">
                  Sign in to your account to continue your journey
                </CardDescription>
                
                {/* Decorative line */}
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mt-4"></div>
              </CardHeader>
              
              <CardContent className="px-10 pb-8">
                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 bg-background/50 border-2 border-border/50 focus:border-blue-500/50 rounded-xl px-4 text-base transition-all duration-300 hover:border-border focus:ring-0"
                    />
                  </div>
                  
                  {/* Password Field */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Lock className="w-4 h-4 text-blue-600" />
                        Password
                      </Label>
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-blue-600 hover:text-blue-500 hover:underline transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 bg-background/50 border-2 border-border/50 focus:border-blue-500/50 rounded-xl px-4 pr-12 text-base transition-all duration-300 hover:border-border focus:ring-0"
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
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-medium text-base shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 mt-8"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <LogIn className="w-4 h-4" />
                        <span>Sign In</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
              
              <CardFooter className="px-10 pb-10">
                {/* Divider */}
                <div className="flex items-center w-full mb-6">
                  <div className="flex-1 h-px bg-border/50"></div>
                  <span className="px-4 text-sm text-muted-foreground">New to our platform?</span>
                  <div className="flex-1 h-px bg-border/50"></div>
                </div>
                
                {/* Sign Up Link */}
                <div className="w-full text-center">
                  <Link 
                    to="/register" 
                    className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 hover:text-blue-500 font-medium transition-all duration-300 hover:bg-blue-500/5 rounded-xl"
                  >
                    <span>Create your account</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardFooter>
            </Card>
            
            {/* Security Notice */}
            <div className="text-center mt-8">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-green-600" />
                <span>
                  Your data is protected with enterprise-grade security
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;