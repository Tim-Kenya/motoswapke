import React from "react";
import { MapPin, Gauge, Calendar, Heart } from "lucide-react";

interface Vehicle {
  id: number;
  title: string;
  price: string;
  location: string;
  image: string;
  condition: string;
  mileage: string;
  year: number;
  transmission: string;
  liked: boolean;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onToggleLike: (id: number) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onToggleLike }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={vehicle.image} 
          alt={vehicle.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${
          vehicle.condition === 'New' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
        }`}>
          {vehicle.condition}
        </span>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleLike(vehicle.id); }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all ${
            vehicle.liked ? 'bg-red-500 text-white' : 'bg-white/90 hover:bg-white text-gray-600 hover:text-red-500'
          }`}
          aria-label={vehicle.liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${vehicle.liked ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition">
            Quick View
          </button>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{vehicle.title}</h3>
        <div className="text-orange-600 font-bold text-xl mb-3">{vehicle.price}</div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{vehicle.location}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Gauge className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{vehicle.mileage}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{vehicle.year} • {vehicle.transmission}</span>
          </div>
        </div>
        <button className="w-full bg-gray-100 hover:bg-orange-600 text-gray-700 hover:text-white py-2.5 rounded-xl font-medium transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;