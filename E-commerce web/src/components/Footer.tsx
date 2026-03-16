import React from "react";
import { Mail, CarFront, Facebook, Twitter, Instagram, Download } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <>
      {/* --- App Download CTA --- */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
            <Download className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-medium">Mobile App Available</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Take MotoSwap KE Anywhere</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Get instant notifications, chat on the go, and manage your listings from your phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              <div className="text-left">
                <div className="text-xs text-gray-500">Download on the</div>
                <div className="font-bold">App Store</div>
              </div>
            </button>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
              <div className="text-left">
                <div className="text-xs text-gray-500">Get it on</div>
                <div className="font-bold">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* --- Newsletter --- */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Mail className="w-10 h-10 text-orange-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Vehicle Alerts</h3>
          <p className="text-gray-600 mb-6">Be the first to know when new vehicles matching your criteria are listed.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              required
            />
            <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-3">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-5 text-white">
                <div className="bg-orange-600 p-2 rounded-lg">
                  <CarFront className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">MotoSwap<span className="text-orange-600">KE</span></span>
              </div>
              <p className="text-sm mb-5 leading-relaxed">Kenya's most trusted marketplace for buying and selling vehicles. Safe, fast, and free to use.</p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="bg-gray-800 hover:bg-orange-600 p-2.5 rounded-lg transition group">
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "Marketplace",
                links: ["Browse All Vehicles", "Sell Your Vehicle", "Price Guide", "Financing Options"]
              },
              {
                title: "Support",
                links: ["Help Center", "Safety Tips", "Report a Listing", "Contact Us"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Press Kit"]
              }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white font-bold mb-4">{col.title}</h4>
                <ul className="space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:text-orange-500 transition">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm">&copy; {new Date().getFullYear()} MotoSwap KE. All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-5 text-sm">
                {["Terms", "Privacy", "Cookies", "Sitemap"].map((link) => (
                  <a key={link} href="#" className="hover:text-orange-500 transition">{link}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Sticky Mobile CTA --- */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 p-3 z-50 shadow-lg">
        <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 rounded-xl font-bold shadow-md">
          Sell Your Vehicle - It's Free
        </button>
      </div>
    </>
  );
};

export default Footer;