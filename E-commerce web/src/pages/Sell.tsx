// import React from "react";
import { User as AuthUser } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface SellProps {
  isAuthenticated: boolean;
  user: AuthUser | undefined;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

function Sell({ isAuthenticated, user, onLogin, onSignup, onLogout }: SellProps) {
  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      <Navbar 
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
      />

      {/* --- Sell Vehicle Section --- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sell Your Vehicle</h1>
          <p className="text-gray-600 mb-8">List your vehicle and reach thousands of buyers across Kenya</p>
          <button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
            Create Free Listing
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Sell;