import React from "react";
import { User as AuthUser } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Features from "../components/Features";

interface HowItWorksProps {
  isAuthenticated: boolean;
  user: AuthUser | undefined;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

function HowItWorks({ isAuthenticated, user, onLogin, onSignup, onLogout }: HowItWorksProps) {
  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      <Navbar 
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
      />

      {/* --- Features + How It Works --- */}
      <Features />

      <Footer />
    </div>
  );
}

export default HowItWorks;