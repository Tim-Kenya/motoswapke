import React, { useState, useEffect } from "react";
import { User as AuthUser } from "@auth0/auth0-react";
import { ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import VehicleCard from "../components/VehicleCard";
import AboutSection from "../components/AboutSection";
import CareersSection from "../components/CareersSection";
import BlogSection from "../components/BlogSection";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

interface HomeProps {
  isAuthenticated: boolean;
  user: AuthUser | undefined;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

// --- Mock Data ---
const featuredVehicles = [
  {
    id: 1,
    title: "Yamaha MT-07 (2021)",
    price: "KSh 850,000",
    location: "Nairobi, Westlands",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800",
    condition: "Used",
    mileage: "12,000 km",
    year: 2021,
    transmission: "Manual",
    liked: false
  },
  {
    id: 2,
    title: "Honda CB500F",
    price: "KSh 720,000",
    location: "Mombasa",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800",
    condition: "Used",
    mileage: "8,500 km",
    year: 2020,
    transmission: "Manual",
    liked: false
  },
  {
    id: 3,
    title: "Bajaj Boxer BM 150",
    price: "KSh 180,000",
    location: "Kisumu",
    image: "https://images.unsplash.com/photo-1622185135505-2d795043906a?auto=format&fit=crop&q=80&w=800",
    condition: "New",
    mileage: "0 km",
    year: 2024,
    transmission: "Manual",
    liked: false
  },
  {
    id: 4,
    title: "Kawasaki Ninja 400",
    price: "KSh 950,000",
    location: "Nairobi, Kilimani",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
    condition: "Used",
    mileage: "5,200 km",
    year: 2022,
    transmission: "Manual",
    liked: false
  },
];

function Home({ isAuthenticated, user, onLogin, onSignup, onLogout }: HomeProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [vehicles, setVehicles] = useState(featuredVehicles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const toggleLike = (id: number) => {
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === id ? { ...vehicle, liked: !vehicle.liked } : vehicle
    ));
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      
      {/* --- Navigation Bar --- */}
      <Navbar 
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
      />

      {/* --- Hero Section + Trust Badges --- */}
      <Hero 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        showAdvanced={showAdvanced}
        setShowAdvanced={setShowAdvanced}
      />

      {/* --- Features + How It Works --- */}
      <Features />

      {/* --- Featured Listings --- */}
      <section className="py-16 bg-gray-50" id="buy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Vehicles</h2>
              <p className="text-gray-500 mt-2">Hand-picked deals updated daily</p>
            </div>
            <a href="#" className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1 transition group">
              View all listings <ChevronDown className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                onToggleLike={toggleLike}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button className="inline-flex items-center gap-2 bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all">
              Load More Vehicles <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* --- About Us --- */}
      <AboutSection />

      {/* --- Careers --- */}
      <CareersSection />

      {/* --- Blog --- */}
      <BlogSection />

      {/* --- Testimonials --- */}
      <Testimonials />

      {/* --- Footer (includes Newsletter, App CTA, Footer) --- */}
      <Footer />
    </div>
  );
}

export default Home;