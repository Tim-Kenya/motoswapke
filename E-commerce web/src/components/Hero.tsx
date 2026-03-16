import React, { useState } from "react";
import { Search, MapPin, ChevronDown, Zap } from "lucide-react";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  showAdvanced,
  setShowAdvanced,
}) => {
  return (
    <>
      {/* --- Hero Section --- */}
      <header className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 md:py-28 overflow-hidden" id="home">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1558980664-2506fca6bfc2?auto=format&fit=crop&q=80&w=1600" 
            alt="Vehicle Background" 
            className="w-full h-full object-cover opacity-25"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-medium">Kenya's #1 Vehicle Marketplace</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Find Your Perfect Ride in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Kenya</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            The safest, fastest way to buy and sell vehicles. From delivery vehicles to supervehicles, MotoSwap KE connects you with trusted sellers nationwide.
          </p>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-3 md:p-4 max-w-4xl mx-auto border border-gray-200">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200 transition">
                <Search className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search vehicles (Yamaha, Honda, Boxer...)" 
                  className="w-full outline-none text-gray-700 bg-transparent placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                <MapPin className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                <select 
                  className="w-full outline-none text-gray-700 bg-transparent cursor-pointer"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option>All Locations</option>
                  <option>Nairobi</option>
                  <option>Mombasa</option>
                  <option>Kisumu</option>
                  <option>Nakuru</option>
                  <option>Eldoret</option>
                </select>
              </div>
              
              <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-6 md:px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap">
                Search
              </button>
            </div>
            
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 mt-3 mx-auto transition"
            >
              Advanced Filters <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </button>
            
            {showAdvanced && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-200">
                <select className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                  <option>Any Year</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                </select>
                <select className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                  <option>Any Price</option>
                  <option>Under KSh 200K</option>
                  <option>KSh 200K - 500K</option>
                  <option>Over KSh 500K</option>
                </select>
                <select className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                  <option>Any Mileage</option>
                  <option>Under 10K km</option>
                  <option>10K - 50K km</option>
                  <option>Over 50K km</option>
                </select>
                <select className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                  <option>Condition</option>
                  <option>New</option>
                  <option>Used</option>
                </select>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm">
            <span className="text-gray-400">Popular:</span>
            {['Yamaha MT-07', 'Honda CB500F', 'Bajaj Boxer', 'Kawasaki Ninja'].map((tag) => (
              <button key={tag} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-gray-300 hover:text-white transition border border-white/10">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* --- Trust Badges / Stats --- */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Vehicles Sold", value: "10,000+" },
              { label: "Happy Riders", value: "8,500+" },
              { label: "Verified Sellers", value: "99.2%" },
              { label: "Avg. Sale Time", value: "4.2 days" }
            ].map((stat, i) => (
              <div key={i} className="p-3">
                <div className="text-2xl md:text-3xl font-bold text-orange-600">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;