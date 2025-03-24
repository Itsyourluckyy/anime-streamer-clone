
import React from "react";
import { Link } from "react-router-dom";
import { Play, Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-orange-600 mb-4">
              <Play className="h-6 w-6 fill-orange-600 text-white" />
              <span>AnimeStream</span>
            </Link>
            <p className="text-gray-600 text-sm mb-6 max-w-md">
              The best place to watch anime online. Stream subbed and dubbed episodes of your favorite anime shows instantly.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 hover:bg-gray-200">
                <Instagram className="h-5 w-5 text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 hover:bg-gray-200">
                <Twitter className="h-5 w-5 text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 hover:bg-gray-200">
                <Facebook className="h-5 w-5 text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 hover:bg-gray-200">
                <Youtube className="h-5 w-5 text-gray-700" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-800 mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/browse" className="text-gray-600 hover:text-orange-600 text-sm transition-colors">
                  Browse Anime
                </Link>
              </li>
              <li>
                <Link to="/browse?filter=new" className="text-gray-600 hover:text-orange-600 text-sm transition-colors">
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/browse?filter=popular" className="text-gray-600 hover:text-orange-600 text-sm transition-colors">
                  Popular
                </Link>
              </li>
              <li>
                <Link to="/genres" className="text-gray-600 hover:text-orange-600 text-sm transition-colors">
                  Genres
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-800 mb-4">
              Account
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-gray-600 hover:text-orange-600 text-sm transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-orange-600 text-sm transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/premium" className="text-gray-600 hover:text-orange-600 text-sm transition-colors">
                  Premium
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-orange-600 text-sm transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-800 mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-orange-600 text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-orange-600 text-sm transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-orange-600 text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-orange-600 text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} AnimeStream. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-500 hover:text-orange-600 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-orange-600 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-orange-600 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
