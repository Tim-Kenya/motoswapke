import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import './App.css';

import Home from './pages/Home';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Reviews from './pages/Reviews';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Careers from './pages/Careers';
import Blog from './pages/Blog';

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect: login,
    logout: auth0Logout,
    user,
  } = useAuth0();

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  const authProps = {
    isAuthenticated,
    user,
    onLogin: login,
    onSignup: signup,
    onLogout: logout
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <>
      <Routes>
        {/* Home Page */}
        <Route 
          path="/" 
          element={<Home {...authProps} />} 
        />
        
        {/* Buy Page */}
        <Route 
          path="/buy" 
          element={<Buy {...authProps} />} 
        />
        
        {/* Sell Page */}
        <Route 
          path="/sell" 
          element={<Sell {...authProps} />} 
        />
        
        {/* Reviews Page */}
        <Route 
          path="/reviews" 
          element={<Reviews {...authProps} />} 
        />
        
        {/* How It Works Page */}
        <Route 
          path="/how-it-works" 
          element={<HowItWorks {...authProps} />} 
        />
        
        {/* About Page */}
        <Route 
          path="/about" 
          element={<About {...authProps} />} 
        />
        
        {/* Careers Page */}
        <Route 
          path="/careers" 
          element={<Careers {...authProps} />} 
        />
        
        {/* Blog Page */}
        <Route 
          path="/blog" 
          element={<Blog {...authProps} />} 
        />
        
        {/* 404 Fallback Route */}
        <Route 
          path="*" 
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-6">Page Not Found</p>
                <a href="/" className="text-orange-600 hover:text-orange-700 font-medium">
                  ← Back to Home
                </a>
              </div>
            </div>
          } 
        />
      </Routes>
    </>
  );
}

export default App;