import React from "react";
import { ShieldCheck, Zap, DollarSign } from "lucide-react";

const Features: React.FC = () => {
  return (
    <>
      {/* --- Features / Trust Section --- */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose MotoSwap KE?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We make buying and selling vehicles safe, simple, and fast.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Sellers",
                description: "Every seller is ID-verified and reviewed. Your safety is our priority.",
                color: "orange"
              },
              {
                icon: Zap,
                title: "Instant Connections",
                description: "Chat directly with sellers. No middlemen, no hidden fees.",
                color: "blue"
              },
              {
                icon: DollarSign,
                title: "Fair Market Prices",
                description: "Real-time price insights help you get the best deal in Kenya.",
                color: "green"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-300 group"
              >
                <div className={`bg-${feature.color}-100 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- How It Works --- */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How MotoSwap KE Works</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Selling or buying your dream vehicle has never been easier.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200"></div>
            
            {[
              { step: "1", title: "List or Browse", desc: "Create a free listing or browse thousands of verified vehicles." },
              { step: "2", title: "Connect Safely", desc: "Chat with buyers/sellers through our secure messaging." },
              { step: "3", title: "Complete Deal", desc: "Meet up, inspect, and finalize with confidence." }
            ].map((item, i) => (
              <div key={i} className="relative text-center pt-8 md:pt-0">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-5 text-white font-bold text-xl shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;