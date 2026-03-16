import React, { useState } from "react";
import { CarFront, Menu, X } from "lucide-react";
import { User as AuthUser } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  isAuthenticated: boolean;
  user: AuthUser | null | undefined;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

const Navbar = ({
  isAuthenticated = false,
  user = null,
  onLogin = () => {},
  onSignup = () => {},
  onLogout = () => {}
}: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = ['Buy', 'Sell', 'Reviews', 'How It Works', 'About', 'Careers', 'Blog'];

  // Helper function to convert link text to route path
  const getRoutePath = (text: string) => {
    return `/${text.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Link to="/">
              <div className="bg-orange-600 p-2 rounded-lg">
                <CarFront className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                MotoSwap<span className="text-orange-600">KE</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((item) => (
              <Link 
                key={item} 
                to={getRoutePath(item)}
                className="text-gray-600 hover:text-orange-600 font-medium transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>
          
          {/* Desktop Actions (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">
                  {user?.name || user?.email}
                </span>
                <button 
                  onClick={onLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="text-sm font-medium">Log out</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={onLogin}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                >
                  <span className="text-sm font-medium">Log in</span>
                </button>
                <button 
                  onClick={onSignup}
                  className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Sign Up
                </button>
              </>
            )}
            <Link 
              to="/sell"
              className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer inline-block text-center"
            >
              Sell Your Vehicle
            </Link>
          </div>

          {/* Mobile Toggle Button (Visible only on mobile) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-orange-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Conditional Rendering) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((item) => (
              <Link 
                key={item} 
                to={getRoutePath(item)}
                className="block px-3 py-2 text-gray-600 hover:text-orange-600 font-medium rounded-md hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            
            {/* Mobile Auth & Actions */}
            <div className="border-t border-gray-100 mt-4 pt-4 space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="px-3 text-sm text-gray-600 font-medium">
                    {user?.name || user?.email}
                  </div>
                  <button 
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }} 
                    className="w-full text-left px-3 py-2 text-gray-600 hover:text-orange-600 font-medium"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      onLogin();
                      setIsMobileMenuOpen(false);
                    }} 
                    className="w-full text-left px-3 py-2 text-gray-600 hover:text-orange-600 font-medium"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => {
                      onSignup();
                      setIsMobileMenuOpen(false);
                    }} 
                    className="w-full bg-orange-600 text-white px-3 py-2 rounded-lg font-semibold"
                  >
                    Sign Up
                  </button>
                </>
              )}
              <Link 
                to="/sell"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white px-3 py-3 rounded-lg font-semibold block text-center"
              >
                Sell Your Vehicle
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;