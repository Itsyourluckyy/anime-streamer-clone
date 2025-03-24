
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Play, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const [activeTab, setActiveTab] = useState<"login" | "signup">(isLogin ? "login" : "signup");
  
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  
  // Form validation states
  const [loginEmailError, setLoginEmailError] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState("");
  const [signupNameError, setSignupNameError] = useState("");
  const [signupEmailError, setSignupEmailError] = useState("");
  const [signupPasswordError, setSignupPasswordError] = useState("");
  
  // Change tab and update URL
  const handleTabChange = (value: "login" | "signup") => {
    setActiveTab(value);
    navigate(value === "login" ? "/login" : "/signup", { replace: true });
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Validate login form
  const validateLoginForm = () => {
    let isValid = true;
    
    if (!loginEmail) {
      setLoginEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      setLoginEmailError("Please enter a valid email");
      isValid = false;
    } else {
      setLoginEmailError("");
    }
    
    if (!loginPassword) {
      setLoginPasswordError("Password is required");
      isValid = false;
    } else if (loginPassword.length < 6) {
      setLoginPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setLoginPasswordError("");
    }
    
    return isValid;
  };
  
  // Validate signup form
  const validateSignupForm = () => {
    let isValid = true;
    
    if (!signupName) {
      setSignupNameError("Name is required");
      isValid = false;
    } else {
      setSignupNameError("");
    }
    
    if (!signupEmail) {
      setSignupEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signupEmail)) {
      setSignupEmailError("Please enter a valid email");
      isValid = false;
    } else {
      setSignupEmailError("");
    }
    
    if (!signupPassword) {
      setSignupPasswordError("Password is required");
      isValid = false;
    } else if (signupPassword.length < 6) {
      setSignupPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setSignupPasswordError("");
    }
    
    return isValid;
  };
  
  // Handle login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateLoginForm()) {
      toast.success("Login successful! Welcome back.");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };
  
  // Handle signup submission
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateSignupForm()) {
      toast.success("Sign up successful! Welcome to AnimeStream.");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <img
          src="https://images4.alphacoders.com/131/1311254.jpeg"
          alt="Anime wallpaper"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to AnimeStream</h1>
          <p className="text-white/90 text-lg max-w-md">
            Your gateway to the best anime content. Stream your favorite shows anytime, anywhere.
          </p>
        </div>
      </div>
      
      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <span className="text-gray-700">Back to Home</span>
            </Link>
            
            <Link 
              to="/" 
              className="flex items-center gap-2 text-xl font-semibold text-orange-600"
            >
              <Play className="h-6 w-6 fill-orange-600 text-white" />
              <span className="hidden sm:inline">AnimeStream</span>
            </Link>
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={handleTabChange as any}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                  <p className="text-sm text-gray-500">
                    Enter your credentials to access your account
                  </p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    {loginEmailError && (
                      <p className="text-red-500 text-xs mt-1">{loginEmailError}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-orange-600 hover:text-orange-700"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {loginPasswordError && (
                      <p className="text-red-500 text-xs mt-1">{loginPasswordError}</p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    Login
                  </Button>
                </form>
                
                <div className="relative my-8">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-2 text-xs text-gray-500">OR CONTINUE WITH</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => toast.info("Google login coming soon!")}>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" onClick={() => toast.info("Facebook login coming soon!")}>
                    <svg className="mr-2 h-4 w-4 text-blue-600 fill-current" viewBox="0 0 24 24">
                      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
                
                <p className="text-center text-sm text-gray-600 mt-6">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-orange-600 hover:text-orange-700 font-medium"
                    onClick={() => handleTabChange("signup")}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="signup">
              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                  <p className="text-sm text-gray-500">
                    Enter your information to create your account
                  </p>
                </div>
                
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                      />
                    </div>
                    {signupNameError && (
                      <p className="text-red-500 text-xs mt-1">{signupNameError}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                      />
                    </div>
                    {signupEmailError && (
                      <p className="text-red-500 text-xs mt-1">{signupEmailError}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {signupPasswordError && (
                      <p className="text-red-500 text-xs mt-1">{signupPasswordError}</p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    Create Account
                  </Button>
                </form>
                
                <div className="relative my-8">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-2 text-xs text-gray-500">OR CONTINUE WITH</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => toast.info("Google signup coming soon!")}>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" onClick={() => toast.info("Facebook signup coming soon!")}>
                    <svg className="mr-2 h-4 w-4 text-blue-600 fill-current" viewBox="0 0 24 24">
                      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
                
                <p className="text-center text-sm text-gray-600 mt-6">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-orange-600 hover:text-orange-700 font-medium"
                    onClick={() => handleTabChange("login")}
                  >
                    Login
                  </button>
                </p>
                
                <p className="text-center text-xs text-gray-500 mt-6">
                  By clicking "Create Account", you agree to our{" "}
                  <Link to="/terms" className="underline hover:text-gray-800">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="underline hover:text-gray-800">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
