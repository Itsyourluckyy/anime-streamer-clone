
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, User, Bell, Play, HelpCircle, Code, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { searchAnime } from "@/services/animeData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearching(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handlePremium = () => {
    toast.info("Premium features coming soon!");
  };

  const handleDevPortal = () => {
    navigate("/dev/777");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isSearching ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-semibold text-orange-600 transition-all duration-300 hover:scale-105"
          >
            <Play className="h-7 w-7 fill-orange-600 text-white" />
            <span className="hidden sm:inline">AnimeStream</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/browse" className="text-sm font-medium hover:text-orange-600 transition-colors">
              Browse
            </Link>
            <Link to="/browse?filter=new" className="text-sm font-medium hover:text-orange-600 transition-colors">
              New Releases
            </Link>
            <Link to="/browse?filter=popular" className="text-sm font-medium hover:text-orange-600 transition-colors">
              Popular
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form 
            onSubmit={handleSearch} 
            className={`relative transition-all duration-300 ${
              isSearching ? "w-64" : "w-0 md:w-auto"
            }`}
          >
            {isSearching ? (
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anime..."
                className="w-full px-4 py-2 rounded-full text-sm"
                autoFocus
              />
            ) : (
              <button 
                type="button" 
                onClick={() => setIsSearching(true)}
                className="p-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
            {isSearching && (
              <button 
                type="button" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => {
                  setIsSearching(false);
                  setSearchQuery("");
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>

          <div className="hidden sm:flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogin}
              className="font-medium"
            >
              Login
            </Button>
            <Button 
              onClick={handleSignUp}
              className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
              size="sm"
            >
              Sign Up
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePremium}
              className="border-orange-600 text-orange-600 hover:bg-orange-50"
            >
              Try Premium
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDevPortal}
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              <Code className="h-4 w-4 mr-2" />
              Dev Portal
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-700">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-700">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-700">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden ml-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full py-4">
                <div className="space-y-4 flex-1 mt-8">
                  <Link 
                    to="/" 
                    className="flex items-center gap-2 text-xl font-semibold text-orange-600 mb-8"
                  >
                    <Play className="h-7 w-7 fill-orange-600 text-white" />
                    <span>AnimeStream</span>
                  </Link>
                  
                  <nav className="flex flex-col space-y-4">
                    <Link to="/browse" className="text-base font-medium py-2 hover:text-orange-600 transition-colors">
                      Browse
                    </Link>
                    <Link to="/browse?filter=new" className="text-base font-medium py-2 hover:text-orange-600 transition-colors">
                      New Releases
                    </Link>
                    <Link to="/browse?filter=popular" className="text-base font-medium py-2 hover:text-orange-600 transition-colors">
                      Popular
                    </Link>
                    <Link to="/contact" className="text-base font-medium py-2 hover:text-orange-600 transition-colors">
                      Contact
                    </Link>
                    <Link to="/login" className="text-base font-medium py-2 hover:text-orange-600 transition-colors">
                      Login
                    </Link>
                    <Link to="/signup" className="text-base font-medium py-2 hover:text-orange-600 transition-colors">
                      Sign Up
                    </Link>
                    <div 
                      onClick={handlePremium}
                      className="text-base font-medium py-2 text-orange-600 cursor-pointer hover:underline"
                    >
                      Try Premium
                    </div>
                    <Link to="/dev/777" className="text-base font-medium py-2 text-purple-600 hover:text-purple-800 transition-colors">
                      <div className="flex items-center">
                        <Code className="h-4 w-4 mr-2" />
                        Dev Portal
                      </div>
                    </Link>
                  </nav>
                </div>
                
                <form onSubmit={handleSearch} className="mt-6">
                  <div className="relative">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search anime..."
                      className="w-full px-4 py-2 pr-10 rounded-full text-sm"
                    />
                    <button 
                      type="submit" 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
