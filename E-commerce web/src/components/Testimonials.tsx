import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "James Mwangi",
    location: "Nairobi",
    text: "Sold my Honda CB in 3 days! MotoSwap KE made it so easy and safe.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 2,
    name: "Grace Akinyi",
    location: "Kisumu",
    text: "Found my dream Yamaha within my budget. Highly recommend!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=5"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">What Riders Say</h2>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.location}</div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{t.text}"</p>
              <div className="flex gap-1 mt-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;