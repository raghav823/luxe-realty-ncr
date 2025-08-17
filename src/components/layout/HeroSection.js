import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building2, Filter, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const locations = [
    'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad', 'Delhi', 
    'Greater Noida', 'New Gurgaon', 'Dwarka', 'Rohini', 'Pitampura'
  ];

  const propertyTypes = [
    'Residential Apartment', 'Independent House', 'Villa', 'Plot/Land',
    'Commercial Office', 'Retail Shop', 'Warehouse', 'Industrial'
  ];

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.append('q', searchQuery);
    if (selectedLocation) searchParams.append('location', selectedLocation);
    if (selectedType) searchParams.append('type', selectedType);
    
    navigate(`/properties?${searchParams.toString()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowLocationDropdown(false);
      setShowTypeDropdown(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-bounce delay-1000"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your
              <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Dream Home
              </span>
              in Delhi NCR
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Discover premium residential & commercial properties from verified builders
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              RERA approved projects • Expert guidance • Transparent pricing
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Search Input */}
              <div className="md:col-span-2 relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by project name, builder, locality..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-4 bg-white/90 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Location Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLocationDropdown(!showLocationDropdown);
                    setShowTypeDropdown(false);
                  }}
                  className="w-full px-4 py-4 bg-white/90 border border-gray-200 rounded-xl text-left text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                    <span className={selectedLocation ? 'text-gray-800' : 'text-gray-500'}>
                      {selectedLocation || 'Select Location'}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                
                {showLocationDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-60 overflow-y-auto z-50">
                    <div className="p-2">
                      {locations.map((location) => (
                        <button
                          key={location}
                          onClick={() => {
                            setSelectedLocation(location);
                            setShowLocationDropdown(false);
                          }}
                          className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Property Type Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTypeDropdown(!showTypeDropdown);
                    setShowLocationDropdown(false);
                  }}
                  className="w-full px-4 py-4 bg-white/90 border border-gray-200 rounded-xl text-left text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Building2 className="w-5 h-5 text-gray-400 mr-2" />
                    <span className={selectedType ? 'text-gray-800' : 'text-gray-500'}>
                      {selectedType || 'Property Type'}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                
                {showTypeDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-60 overflow-y-auto z-50">
                    <div className="p-2">
                      {propertyTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setSelectedType(type);
                            setShowTypeDropdown(false);
                          }}
                          className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSearch}
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Search Properties
              </button>
              <button
                onClick={() => navigate('/properties')}
                className="flex-1 sm:flex-none bg-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center"
              >
                <Filter className="w-5 h-5 mr-2" />
                Advanced Filters
              </button>
            </div>

            {/* Quick Access Tags */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {['New Launch', 'Ready to Move', 'Under Construction', 'Investment'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    handleSearch();
                  }}
                  className="px-4 py-2 bg-white/20 text-white rounded-full text-sm hover:bg-white/30 transition-colors border border-white/30"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6">
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => navigate('/properties')}
              className="text-white border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Browse Properties
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;