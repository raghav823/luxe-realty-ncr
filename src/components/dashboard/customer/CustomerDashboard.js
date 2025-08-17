import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Phone,
  Mail,
  MapPin,
  Heart,
  PieChart,
  BarChart3,
  Target,
  Wallet,
  Home
} from 'lucide-react';

// Main Customer Dashboard Component
const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [customerData, setCustomerData] = useState(null); // initially null

  useEffect(() => {
    // Fetch user data from backend API or localStorage
    // Example: from API
    fetch('/api/current-user')
      .then(res => res.json())
      .then(data => setCustomerData(data))
      .catch(err => {
        console.error('Failed to fetch user data:', err);
        // fallback: maybe get from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) setCustomerData(storedUser);
      });
  }, []);

  // Show loading until user data is fetched
  if (!customerData) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {customerData.profile.name}!
              </h1>
              <p className="text-gray-400 mt-1">
                Manage your investments and track your property portfolio
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg font-medium transition-colors">
                <Plus className="h-4 w-4 inline mr-2" />
                New Investment
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                <Download className="h-4 w-4 inline mr-2" />
                Export Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <nav className="flex space-x-8">
              {[
                { key: 'overview', label: 'Overview', icon: BarChart3 },
                { key: 'portfolio', label: 'Investment Portfolio', icon: PieChart },
                { key: 'wishlist', label: 'Wishlist', icon: Heart },
                { key: 'profile', label: 'Profile', icon: Users }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-yellow-500 text-yellow-500'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab customerData={customerData} />}
        {activeTab === 'portfolio' && <InvestmentPortfolioTab customerData={customerData} />}
        {activeTab === 'wishlist' && <WishlistTab customerData={customerData} />}
        {activeTab === 'profile' && <ProfileTab customerData={customerData} />}
      </div>
    </div>
  );
};

// Overview Tab
const OverviewTab = ({ customerData }) => (
  <div className="space-y-8">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Investments</p>
            <p className="text-2xl font-bold text-white mt-1">{customerData.stats.totalInvestments}</p>
            <p className="text-green-400 text-xs mt-1">+8.5% this month</p>
          </div>
          <div className="bg-green-500/20 p-3 rounded-lg">
            <Wallet className="h-6 w-6 text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Active Properties</p>
            <p className="text-2xl font-bold text-white mt-1">{customerData.stats.activeInvestments}</p>
            <p className="text-blue-400 text-xs mt-1">Across 2 locations</p>
          </div>
          <div className="bg-blue-500/20 p-3 rounded-lg">
            <Home className="h-6 w-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Returns</p>
            <p className="text-2xl font-bold text-white mt-1">{customerData.stats.totalReturns}</p>
            <p className="text-yellow-400 text-xs mt-1">12.5% ROI</p>
          </div>
          <div className="bg-yellow-500/20 p-3 rounded-lg">
            <TrendingUp className="h-6 w-6 text-yellow-400" />
          </div>
        </div>
      </div>
    </div>

    {/* Recent Activities */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {customerData.recentActivities.map(activity => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg">
              <div className={`p-2 rounded-lg ${
                activity.type === 'investment' ? 'bg-green-500/20' :
                activity.type === 'inquiry' ? 'bg-blue-500/20' : 'bg-yellow-500/20'
              }`}>
                {activity.type === 'investment' && <Wallet className="h-4 w-4 text-green-400" />}
                {activity.type === 'inquiry' && <MessageSquare className="h-4 w-4 text-blue-400" />}
                {activity.type === 'wishlist' && <Heart className="h-4 w-4 text-yellow-400" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">{activity.title}</p>
                <p className="text-gray-400 text-sm">{activity.description}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(activity.date).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <QuickActions />
    </div>
  </div>
);

// Quick Actions Component
const QuickActions = () => (
  <div className="bg-gray-800 rounded-lg p-6">
    <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
    <div className="grid grid-cols-2 gap-4">
      {[
        { label: 'New Investment', icon: Plus, color: 'green' },
        { label: 'Browse Properties', icon: Search, color: 'blue' },
        { label: 'Portfolio Analysis', icon: BarChart3, color: 'yellow' },
        { label: 'Contact Support', icon: MessageSquare, color: 'purple' }
      ].map((action, i) => (
        <button key={i} className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg transition-colors text-left">
          <div className={`bg-${action.color}-500/20 p-2 rounded-lg inline-block mb-2`}>
            <action.icon className={`h-5 w-5 text-${action.color}-400`} />
          </div>
          <p className="font-medium">{action.label}</p>
          <p className="text-gray-400 text-sm">Action</p>
        </button>
      ))}
    </div>
  </div>
);

// Portfolio Tab
const InvestmentPortfolioTab = ({ customerData }) => {
  const investments = customerData.investments || [];
  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Portfolio Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{customerData.stats.totalInvestments}</p>
            <p className="text-gray-400 text-sm">Total Investment</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{customerData.stats.currentValue}</p>
            <p className="text-gray-400 text-sm">Current Value</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">{customerData.stats.averageReturns}</p>
            <p className="text-gray-400 text-sm">Average Returns</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">{customerData.stats.activeInvestments}</p>
            <p className="text-gray-400 text-sm">Active Properties</p>
          </div>
        </div>
      </div>

      {/* Investment List */}
      <div className="space-y-4">
        {investments.map(inv => (
          <div key={inv.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{inv.propertyName}</h4>
                    <p className="text-gray-400 text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {inv.location}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    inv.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {inv.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Investment</p>
                    <p className="font-semibold text-white">{inv.investmentAmount}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Current Value</p>
                    <p className="font-semibold text-white">{inv.currentValue}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Returns</p>
                    <p className="font-semibold text-green-400">{inv.returns}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Property Type</p>
                    <p className="font-semibold text-white">{inv.propertyType}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg font-medium transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                  Progress Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Wishlist Tab
const WishlistTab = ({ customerData }) => {
  const wishlistItems = customerData.wishlist || [];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">My Wishlist ({wishlistItems.length} items)</h3>
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wishlistItems.map(item => (
          <div key={item.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-white">{item.propertyName}</h4>
                <p className="text-gray-400 text-sm flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {item.location}
                </p>
              </div>
              <button className="text-red-400 hover:text-red-300">
                <Heart className="h-5 w-5 fill-current" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Price Range:</span>
                <span className="text-white font-medium">{item.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Type:</span>
                <span className="text-white">{item.propertyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Builder:</span>
                <span className="text-white">{item.builderName}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg font-medium transition-colors">
                View Property
              </button>
              <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                Send Inquiry
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Profile Tab
const ProfileTab = ({ customerData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(customerData.profile);

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Profile Information</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg font-medium transition-colors"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(profileData).map(key => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-400 mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData[key]}
                  onChange={(e) => setProfileData({...profileData, [key]: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              ) : (
                <p className="text-white">{profileData[key]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Account Settings</h3>
        <div className="space-y-4">
          {['Email Notifications', 'SMS Alerts'].map((setting, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-white">{setting}</p>
                <p className="text-gray-400 text-sm">Manage your preferences</p>
              </div>
              <input type="checkbox" className="toggle toggle-accent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
