import React, { useState, useEffect } from "react";
import { User as AuthUser } from "@auth0/auth0-react";
import { 
  Search, MapPin, DollarSign, ChevronRight, Bike, ShieldCheck, 
  Zap, Heart, Calendar, Gauge, ChevronDown, Star, Download, 
  Mail, Phone, Facebook, Twitter, Instagram, Users, Briefcase, 
  ArrowRight, Clock, User as UserIcon, Tag
} from "lucide-react";

interface HomeProps {
  isAuthenticated: boolean;
  user: AuthUser | undefined;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

// --- Mock Data ---
const featuredBikes = [
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

// About Us Data
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

// Careers Data
const openJobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Nairobi (Hybrid)",
    type: "Full-time"
  },
  {
    id: 2,
    title: "Community Operations Lead",
    department: "Operations",
    location: "Remote (Kenya)",
    type: "Full-time"
  },
  {
    id: 3,
    title: "Content Marketing Specialist",
    department: "Marketing",
    location: "Nairobi",
    type: "Contract"
  }
];

// Blog Data
const blogPosts = [
  {
    id: 1,
    title: "5 Things to Check Before Buying a Used Motorcycle in Kenya",
    excerpt: "Avoid costly mistakes with our expert checklist for inspecting second-hand bikes.",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800",
    category: "Buying Tips",
    author: "David Kamau",
    date: "Mar 5, 2026",
    readTime: "6 min read"
  },
  {
    id: 2,
    title: "How to Price Your Motorcycle for a Quick Sale in Nairobi",
    excerpt: "Data-driven strategies to attract serious buyers without undervaluing your bike.",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800",
    category: "Selling Guide",
    author: "Sarah Wanjiku",
    date: "Feb 28, 2026",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "Bajaj Boxer vs. TVS Raider: Which Delivery Bike Wins in 2026?",
    excerpt: "We compare fuel efficiency, maintenance costs, and resale value for Kenya's top delivery bikes.",
    image: "https://images.unsplash.com/photo-1622185135505-2d795043906a?auto=format&fit=crop&q=80&w=800",
    category: "Industry News",
    author: "James Ochieng",
    date: "Feb 20, 2026",
    readTime: "8 min read"
  }
];

function Home({ isAuthenticated, user, onLogin, onSignup, onLogout }: HomeProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [bikes, setBikes] = useState(featuredBikes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const toggleLike = (id: number) => {
    setBikes(bikes.map(bike => 
      bike.id === id ? { ...bike, liked: !bike.liked } : bike
    ));
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      
      {/* --- Navigation Bar --- */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-orange-600 p-2 rounded-lg">
                <Bike className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                MotoSwap<span className="text-orange-600">KE</span>
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['Buy', 'Sell', 'Reviews', 'How It Works', 'About', 'Careers', 'Blog'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-orange-600 font-medium transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600 hidden md:block">
                    {user?.name || user?.email}
                  </span>
                  <button 
                    onClick={onLogout}
                    className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <span className="text-sm font-medium">Log out</span>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={onLogin}
                    className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  >
                    <span className="text-sm font-medium">Log in</span>
                  </button>
                  <button 
                    onClick={onSignup}
                    className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Sign Up
                  </button>
                </>
              )}
              <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer">
                Sell Your Bike
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 md:py-28 overflow-hidden" id="home">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1558980664-2506fca6bfc2?auto=format&fit=crop&q=80&w=1600" 
            alt="Motorcycle Background" 
            className="w-full h-full object-cover opacity-25"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-medium">Kenya's #1 Bike Marketplace</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Find Your Perfect Ride in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Kenya</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            The safest, fastest way to buy and sell motorbikes. From delivery bikes to superbikes, MotoSwap KE connects you with trusted sellers nationwide.
          </p>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-3 md:p-4 max-w-4xl mx-auto border border-gray-200">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200 transition">
                <Search className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search bikes (Yamaha, Honda, Boxer...)" 
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
              { label: "Bikes Sold", value: "10,000+" },
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

      {/* --- Features / Trust Section --- */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose MotoSwap KE?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We make buying and selling motorbikes safe, simple, and fast.</p>
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

      {/* --- Featured Listings --- */}
      <section className="py-16 bg-gray-50" id="buy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Motorbikes</h2>
              <p className="text-gray-500 mt-2">Hand-picked deals updated daily</p>
            </div>
            <a href="#" className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1 transition group">
              View all listings <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bikes.map((bike) => (
              <div 
                key={bike.id} 
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer transform hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={bike.image} 
                    alt={bike.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${
                    bike.condition === 'New' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {bike.condition}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleLike(bike.id); }}
                    className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all ${
                      bike.liked ? 'bg-red-500 text-white' : 'bg-white/90 hover:bg-white text-gray-600 hover:text-red-500'
                    }`}
                    aria-label={bike.liked ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={`w-4 h-4 ${bike.liked ? 'fill-current' : ''}`} />
                  </button>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{bike.title}</h3>
                  <div className="text-orange-600 font-bold text-xl mb-3">{bike.price}</div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{bike.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Gauge className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{bike.mileage}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{bike.year} • {bike.transmission}</span>
                    </div>
                  </div>
                  <button className="w-full bg-gray-100 hover:bg-orange-600 text-gray-700 hover:text-white py-2.5 rounded-xl font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button className="inline-flex items-center gap-2 bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all">
              Load More Bikes <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-1.5 mb-4">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">About Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Powering Kenya's <span className="text-orange-600">Motorcycle Revolution</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Founded in 2023, MotoSwap KE was born from a simple idea: make buying and selling motorbikes in Kenya safe, simple, and accessible for everyone.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Today, we're proud to connect thousands of buyers and sellers across Nairobi, Mombasa, Kisumu, and beyond. But we're just getting started.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: "10K+", label: "Bikes Listed" },
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

      {/* --- CAREERS SECTION --- */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-white" id="careers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-1.5 mb-4 mx-auto">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-medium">Careers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Build the Future of <span className="text-orange-600">Mobility in Kenya</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're looking for passionate riders, builders, and thinkers to help us transform how Kenya buys and sells motorbikes.
            </p>
          </div>

          {/* Job Listings Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {openJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                    {job.department}
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition">{job.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {job.location}
                </div>
                <button className="w-full bg-gray-100 hover:bg-orange-600 text-gray-700 hover:text-white py-2 rounded-lg font-medium transition text-sm">
                  View Role
                </button>
              </div>
            ))}
          </div>

          {/* Culture Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Heart, title: "Health Coverage", desc: "Medical insurance for you & family" },
              { icon: Clock, title: "Flexible Work", desc: "Remote-friendly & flexible hours" },
              { icon: Bike, title: "Bike Allowance", desc: "Annual stipend for maintenance" }
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="#careers" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg">
              View All Open Roles <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* --- BLOG SECTION --- */}
      <section className="py-20 bg-white" id="blog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-1.5 mb-4">
                <Tag className="w-4 h-4" />
                <span className="text-sm font-medium">Blog</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Tips, Stories & <span className="text-orange-600">Industry News</span></h2>
              <p className="text-gray-500 mt-2">Expert advice from Kenya's motorcycle community</p>
            </div>
            <a href="#blog" className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1 transition group">
              View all articles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Post */}
            <article className="lg:col-span-2 group cursor-pointer">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {blogPosts[0].category}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition line-clamp-2">
                {blogPosts[0].title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{blogPosts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <UserIcon className="w-4 h-4" /> {blogPosts[0].author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {blogPosts[0].date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {blogPosts[0].readTime}
                </span>
              </div>
            </article>

            {/* Sidebar Posts */}
            <div className="space-y-4">
              {blogPosts.slice(1).map((post) => (
                <article key={post.id} className="flex gap-4 group cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium text-orange-600">{post.category}</span>
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition line-clamp-2 text-sm">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- How It Works --- */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How MotoSwap KE Works</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Selling or buying your dream bike has never been easier.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200"></div>
            
            {[
              { step: "1", title: "List or Browse", desc: "Create a free listing or browse thousands of verified bikes." },
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

      {/* --- Testimonials --- */}
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
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Bike Alerts</h3>
          <p className="text-gray-600 mb-6">Be the first to know when new bikes matching your criteria are listed.</p>
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
                  <Bike className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">MotoSwap<span className="text-orange-600">KE</span></span>
              </div>
              <p className="text-sm mb-5 leading-relaxed">Kenya's most trusted marketplace for buying and selling motorbikes. Safe, fast, and free to use.</p>
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
                links: ["Browse All Bikes", "Sell Your Bike", "Price Guide", "Financing Options"]
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
          Sell Your Bike - It's Free
        </button>
      </div>
    </div>
  );
}

export default Home;