// frontend/src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { User as AuthUser } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { User, Package, Edit2, Trash2, Plus, Save, X, MapPin, Phone, Mail } from "lucide-react";

interface DashboardProps {
  isAuthenticated: boolean;
  user: AuthUser | undefined;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface Vehicle {
  id: number;
  title: string;
  price: number;
  location: string;
  condition: string;
  status: string;
  image_url: string;
  created_at: string;
  seller_email?: string;
}

const API_URL = 'http://localhost:5000/api';

const Dashboard: React.FC<DashboardProps> = ({ isAuthenticated, user, onLogin, onSignup, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'listings'>('listings');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [loading, setLoading] = useState(false);

  // User profile state
  const [profile, setProfile] = useState<UserProfile>({
    id: 1,
    name: user?.name || "Demo User",
    email: user?.email || "demo@motorswap.ke",
    phone: "+254 700 000 000",
    location: "Nairobi"
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // Form states
  const [profileForm, setProfileForm] = useState(profile);
  const [vehicleForm, setVehicleForm] = useState({
    title: '',
    price: '',
    location: '',
    condition: 'Used',
    transmission: 'Manual',
    description: '',
    mileage: '',
    year: new Date().getFullYear().toString(),
    image_url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800'
  });

  // Fetch user's vehicles on load
  useEffect(() => {
    if (isAuthenticated) {
      fetchVehicles();
      // Load profile from backend if needed
      if (user?.email) {
        fetchProfile(user.email);
      }
    }
  }, [isAuthenticated, user?.email]);

  const fetchProfile = async (email: string) => {
    try {
      const res = await fetch(`${API_URL}/user/${email}`);
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setProfileForm(data);
      }
    } catch (err) {
      console.log('Profile fetch skipped (demo mode)');
    }
  };

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/vehicles`);
      const data = await res.json();
      
      // Filter to show only current user's vehicles (by email match)
      const userVehicles = data.filter((v: Vehicle) => 
        v.seller_email === profile.email || !v.seller_email
      );
      
      setVehicles(userVehicles);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
      // Fallback: use empty array for demo
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/profile/${profile.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileForm.name,
          phone: profileForm.phone,
          location: profileForm.location
        }),
      });

      const result = await res.json();
      
      if (res.ok) {
        setProfile(profileForm);
        setIsEditing(false);
        alert('✅ ' + result.message);
      } else {
        alert('❌ ' + (result.error || 'Failed to update'));
      }
    } catch (error) {
      // Fallback for demo: just update local state
      setProfile(profileForm);
      setIsEditing(false);
      alert('✅ Profile updated (demo mode)');
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = async () => {
    if (!vehicleForm.title || !vehicleForm.price) {
      alert('⚠️ Please fill in title and price');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/vehicles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...vehicleForm,
          price: parseFloat(vehicleForm.price),
          mileage: vehicleForm.mileage ? parseInt(vehicleForm.mileage) : null,
          year: vehicleForm.year ? parseInt(vehicleForm.year) : null,
          seller_email: profile.email
        }),
      });

      const result = await res.json();
      
      if (res.ok) {
        alert('✅ ' + result.message);
        setShowAddVehicle(false);
        fetchVehicles();
        // Reset form
        setVehicleForm({
          title: '', price: '', location: '', condition: 'Used',
          transmission: 'Manual', description: '', mileage: '',
          year: new Date().getFullYear().toString(),
          image_url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800'
        });
      } else {
        alert('❌ ' + (result.error || 'Failed to list vehicle'));
      }
    } catch (error) {
      alert('❌ Failed to connect to server. Is backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVehicle = async (id: number) => {
    if (!confirm('Delete this listing?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/vehicles/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();
      
      if (res.ok) {
        alert('✅ ' + result.message);
        fetchVehicles();
      } else {
        alert('❌ ' + (result.error || 'Failed to delete'));
      }
    } catch (error) {
      alert('❌ Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">🔐 Please log in</h1>
          <button 
            onClick={onLogin}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            Log In with Auth0
          </button>
          <p className="text-gray-500 mt-4 text-sm">Demo: Refresh page to skip auth for testing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      <Navbar 
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">👋 Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome, {profile.name}!</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('listings')}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition ${
              activeTab === 'listings' 
                ? 'text-orange-600 border-b-2 border-orange-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package className="w-5 h-5" />
            My Listings ({vehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition ${
              activeTab === 'profile' 
                ? 'text-orange-600 border-b-2 border-orange-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-5 h-5" />
            Profile
          </button>
        </div>

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Vehicle Listings</h2>
              <button
                onClick={() => setShowAddVehicle(true)}
                disabled={loading}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                <Plus className="w-5 h-5" />
                {loading ? 'Loading...' : 'Add New Listing'}
              </button>
            </div>

            {loading && vehicles.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                <p className="text-gray-500 mt-4">Loading your listings...</p>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                <p className="text-gray-600 mb-4">Start by creating your first vehicle listing</p>
                <button
                  onClick={() => setShowAddVehicle(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  Create Listing
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition">
                    <img 
                      src={vehicle.image_url || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800'} 
                      alt={vehicle.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                      }}
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{vehicle.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          vehicle.status === 'Available' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {vehicle.status}
                        </span>
                      </div>
                      <p className="text-orange-600 font-bold text-lg mb-2">KSh {Number(vehicle.price).toLocaleString()}</p>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {vehicle.location}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          disabled
                          className="flex-1 bg-gray-100 text-gray-400 px-3 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          disabled={loading}
                          className="flex-1 bg-red-50 hover:bg-red-100 disabled:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          {loading ? '...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    disabled={loading}
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium disabled:text-gray-400"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setProfileForm(profile);
                        setIsEditing(false);
                      }}
                      disabled={loading}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium disabled:text-gray-400"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleProfileUpdate}
                      disabled={loading}
                      className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white px-4 py-2 rounded-lg font-medium transition"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      disabled={loading}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email
                  </label>
                  <p className="text-gray-900">{profile.email} <span className="text-xs text-gray-500">(cannot change)</span></p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      disabled={loading}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      disabled={loading}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.location}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Vehicle Modal */}
      {showAddVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-semibold">🚗 Create New Listing</h2>
              <button
                onClick={() => setShowAddVehicle(false)}
                disabled={loading}
                className="text-gray-400 hover:text-gray-600 disabled:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Title *</label>
                <input
                  type="text"
                  value={vehicleForm.title}
                  onChange={(e) => setVehicleForm({...vehicleForm, title: e.target.value})}
                  placeholder="e.g., Yamaha MT-07 (2021)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (KSh) *</label>
                  <input
                    type="number"
                    value={vehicleForm.price}
                    onChange={(e) => setVehicleForm({...vehicleForm, price: e.target.value})}
                    placeholder="850000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    value={vehicleForm.location}
                    onChange={(e) => setVehicleForm({...vehicleForm, location: e.target.value})}
                    placeholder="Nairobi"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition *</label>
                  <select
                    value={vehicleForm.condition}
                    onChange={(e) => setVehicleForm({...vehicleForm, condition: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    disabled={loading}
                  >
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transmission *</label>
                  <select
                    value={vehicleForm.transmission}
                    onChange={(e) => setVehicleForm({...vehicleForm, transmission: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    disabled={loading}
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    value={vehicleForm.year}
                    onChange={(e) => setVehicleForm({...vehicleForm, year: e.target.value})}
                    placeholder="2021"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mileage (km)</label>
                  <input
                    type="number"
                    value={vehicleForm.mileage}
                    onChange={(e) => setVehicleForm({...vehicleForm, mileage: e.target.value})}
                    placeholder="12000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={vehicleForm.description}
                  onChange={(e) => setVehicleForm({...vehicleForm, description: e.target.value})}
                  placeholder="Describe your vehicle..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={vehicleForm.image_url}
                  onChange={(e) => setVehicleForm({...vehicleForm, image_url: e.target.value})}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">💡 Tip: Use a Unsplash image URL for demo</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowAddVehicle(false)}
                disabled={loading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVehicle}
                disabled={loading}
                className="px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white rounded-lg font-medium transition flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Creating...
                  </>
                ) : 'Create Listing'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;