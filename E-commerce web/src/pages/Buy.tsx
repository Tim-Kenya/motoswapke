import { useState } from "react";
import { User as AuthUser } from "@auth0/auth0-react";
import { ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VehicleCard from "../components/VehicleCard";
import tlc200Image from "../assets/tlc200.jfif"; 
import c200 from "../assets/c200.jpeg";
import crown from "../assets/crown.jfif";
import porsche911 from "../assets/porsche911.jfif";


interface BuyProps {
  isAuthenticated: boolean;
  user: AuthUser | undefined;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

const featuredVehicles = [
  {
    id: 1,
    title: "Landcruiser TLC 200",
    price: "KSh 8,000,000",
    location: "Nairobi, Westlands",
    image: tlc200Image,
    condition: "Used",
    mileage: "12,000 km",
    year: 2021,
    transmission: "Automatic",
    liked: false
  },
  {
    id: 2,
    title: "Benz c-200",
    price: "KSh 3,000,000",
    location: "Mombasa",
    image: c200,
    condition: "Used",
    mileage: "8,500 km",
    year: 2020,
    transmission: "Manual",
    liked: false
  },
  {
    id: 3,
    title: "Crown Athlete",
    price: "KSh 2,800,000",
    location: "Kisumu",
    image: crown,
    condition: "New",
    mileage: "0 km",
    year: 2024,
    transmission: "Automatic",
    liked: false
  },
  {
    id: 4,
    title: "911 turbo s",
    price: "KSh 30,950,000",
    location: "Nairobi, Kilimani",
    image: porsche911,
    condition: "Used",
    mileage: "5,200 km",
    year: 2022,
    transmission: "Manual",
    liked: false
  },
];

function Buy({ isAuthenticated, user, onLogin, onSignup, onLogout }: BuyProps) {
  const [vehicles, setVehicles] = useState(featuredVehicles);

  const toggleLike = (id: number) => {
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === id ? { ...vehicle, liked: !vehicle.liked } : vehicle
    ));
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      <Navbar 
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
      />

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

      <Footer />
    </div>
  );
}

export default Buy;