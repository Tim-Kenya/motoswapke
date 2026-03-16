import React from "react";
import { User as AuthUser } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogSection from "../components/BlogSection";

interface BlogProps {
  isAuthenticated: boolean;
  user: AuthUser | undefined;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

function Blog({ isAuthenticated, user, onLogin, onSignup, onLogout }: BlogProps) {
  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      <Navbar 
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
      />

      {/* --- Blog --- */}
      <BlogSection />

      <Footer />
    </div>
  );
}

export default Blog;