// import React from "react";
import { User as AuthUser } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CareersSection from "../components/CareersSection";

interface CareersProps {
  isAuthenticated: boolean;
  user: AuthUser | undefined;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

function Careers({ isAuthenticated, user, onLogin, onSignup, onLogout }: CareersProps) {
  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      <Navbar 
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
      />

      {/* --- Careers --- */}
      <CareersSection />

      <Footer />
    </div>
  );
}

export default Careers;