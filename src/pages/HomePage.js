import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProperties } from '../contexts/PropertyContext';
import { 
  Search, 
  MapPin, 
  Building2, 
  Crown, 
  TrendingUp, 
  Shield, 
  Award,
  ArrowRight,
  Star,
  Users,
  Home as HomeIcon,
  CheckCircle
} from 'lucide-react';
import PropertyCard from '../components/property/PropertyCard';
import StatsSection from '../components/layout/StatsSection';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const { getFeaturedProperties, updateFilters } = useProperties();
  const navigate = useNavigate();

  const featuredProperties = getFeaturedProperties();

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilters({ searchQuery, location: selectedLocation });
    navigate('/properties');
  };

  const popularLocations = [
    'Gurgaon Sector 49', 'Noida Sector 107', 'Greater Noida West',
    'Dwarka Expressway', 'Golf Course Extension', 'Yamuna Expressway'
  ];

  const features = [
    {
      icon: Shield,
      title: 'RERA Approved',
      description: 'All properties are RERA registered and verified'
    },
    {
      icon: Award,
      title: 'Premium Builders',
      description: 'Partner with top-rated developers in NCR'
    },
    {
      icon: TrendingUp,
      title: 'Investment Returns',
      description: 'Track your property investments and returns'
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: '24/7 support from real estate experts'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 via-transparent to-gold-600/20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-full px-6 py-2 mb-8">
              <Crown className="h-4 w-4 text-gold-400" />
              <span className="text-sm text-gray-300">Premium Real Estate Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover Upcoming
              <span className="block text-gradient">Properties in Delhi NCR</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Invest in premium residential and commercial projects from India's most trusted builders. 
              Your dream property awaits.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-16">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search properties, builders, areas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-dark-800/80 border border-dark-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-200"
                    />
                  </div>
                  
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-dark-800/80 border border-dark-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-200"
                    >
                      <option value="">All Locations</option>
                      {popularLocations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary py-4 text-lg font-semibold"
                  >
                    Search Properties
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">500+</div>
                <div className="text-gray-300 group-hover:text-gold-400 transition-colors duration-200">Properties</div>
              </div>
              <div className="group">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">50+</div>
                <div className="text-gray-300 group-hover:text-gold-400 transition-colors duration-200">Builders</div>
              </div>
              <div className="group">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">10K+</div>
                <div className="text-gray-300 group-hover:text-gold-400 transition-colors duration-200">Happy Customers</div>
              </div>
              <div className="group">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">₹500Cr+</div>
                <div className="text-gray-300 group-hover:text-gold-400 transition-colors duration-200">Properties Sold</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">LuxeRealty NCR</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the future of real estate investment with our premium platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group card-luxury p-8 text-center hover-lift">
                <div className="bg-gradient-to-br from-gold-500 to-gold-600 p-4 rounded-xl inline-block mb-6 group-hover:shadow-lg transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-gold-400 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured <span className="text-gradient">Properties</span>
              </h2>
              <p className="text-xl text-gray-400">
                Handpicked premium properties from top developers
              </p>
            </div>
            <Link
              to="/properties"
              className="hidden md:flex items-center space-x-2 text-gold-400 hover:text-gold-300 font-semibold transition-colors duration-200"
            >
              <span>View All Properties</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/properties" className="btn-primary inline-flex items-center space-x-2">
              <span>Explore All Properties</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Invest in Your 
              <span className="block text-gradient">Dream Property?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Join thousands of satisfied investors who have found their perfect properties 
              through LuxeRealty NCR. Start your journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register" className="btn-primary text-lg px-8 py-4">
                Start Investing Today
              </Link>
              <Link to="/properties" className="btn-secondary text-lg px-8 py-4">
                Browse Properties
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 mt-16 opacity-60">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">RERA Approved</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">Verified Builders</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">Secure Transactions</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">Expert Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;