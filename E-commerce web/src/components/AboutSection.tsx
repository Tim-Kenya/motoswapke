import React from "react";
import { Users, ArrowRight } from "lucide-react";

const teamMembers = [
  {
    name: "David Kamau",
    role: "Founder & CEO",
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Sarah Wanjiku",
    role: "Head of Operations",
    image: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "James Ochieng",
    role: "Tech Lead",
    image: "https://i.pravatar.cc/150?img=13"
  }
];

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-1.5 mb-4">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">About Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Powering Kenya's <span className="text-orange-600">Vehicle Revolution</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Founded in 2023, MotoSwap KE was born from a simple idea: make buying and selling vehicles in Kenya safe, simple, and accessible for everyone.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Today, we're proud to connect thousands of buyers and sellers across Nairobi, Mombasa, Kisumu, and beyond. But we're just getting started.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: "10K+", label: "Vehicles Listed" },
                { value: "47", label: "Counties" },
                { value: "98%", label: "Satisfaction" }
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <a href="#about" className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition group">
              Learn more about our story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400" 
                alt="Team" 
                className="rounded-2xl shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400" 
                alt="Office" 
                className="rounded-2xl shadow-lg mt-8"
              />
            </div>
            
            {/* Team Preview */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 max-w-xs">
              <h4 className="font-bold text-gray-900 mb-3">Meet Our Team</h4>
              <div className="flex -space-x-3">
                {teamMembers.map((member, i) => (
                  <img 
                    key={i} 
                    src={member.image} 
                    alt={member.name}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    title={member.name}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">+3 more team members</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;