import React, { useState, useContext } from 'react';
import { PropertyContext } from '../../contexts/PropertyContext';

const PropertyFilters = ({ onFiltersChange }) => {
  const { properties } = useContext(PropertyContext);
  const [filters, setFilters] = useState({
    priceRange: '',
    propertyType: '',
    location: '',
    possession: '',
    builder: '',
    bhk: '',
    amenities: []
  });

  // Extract unique values for filter options
  const uniqueLocations = [...new Set(properties.map(p => p.location))];
  const uniqueBuilders = [...new Set(properties.map(p => p.builder))];
  const uniqueTypes = [...new Set(properties.map(p => p.type))];

  const priceRanges = [
    { label: 'Under ₹50L', value: '0-5000000' },
    { label: '₹50L - ₹1Cr', value: '5000000-10000000' },
    { label: '₹1Cr - ₹2Cr', value: '10000000-20000000' },
    { label: '₹2Cr - ₹5Cr', value: '20000000-50000000' },
    { label: 'Above ₹5Cr', value: '50000000-999999999' }
  ];

  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'];
  
  const possessionOptions = [
    'Ready to Move',
    'Under Construction',
    'New Launch',
    'Resale'
  ];

  const amenitiesOptions = [
    'Swimming Pool',
    'Gym',
    'Club House',
    'Parking',
    'Security',
    'Power Backup',
    'Lift',
    'Garden',
    'Kids Play Area',
    'Sports Facility'
  ];

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleAmenityToggle = (amenity) => {
    const updatedAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    
    const updatedFilters = { ...filters, amenities: updatedAmenities };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      priceRange: '',
      propertyType: '',
      location: '',
      possession: '',
      builder: '',
      bhk: '',
      amenities: []
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Price</option>
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Property Type
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Type</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Location</option>
            {uniqueLocations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* BHK */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            BHK
          </label>
          <select
            value={filters.bhk}
            onChange={(e) => handleFilterChange('bhk', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any BHK</option>
            {bhkOptions.map(bhk => (
              <option key={bhk} value={bhk}>
                {bhk}
              </option>
            ))}
          </select>
        </div>

        {/* Builder */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Builder
          </label>
          <select
            value={filters.builder}
            onChange={(e) => handleFilterChange('builder', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Builder</option>
            {uniqueBuilders.map(builder => (
              <option key={builder} value={builder}>
                {builder}
              </option>
            ))}
          </select>
        </div>

        {/* Possession */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Possession
          </label>
          <select
            value={filters.possession}
            onChange={(e) => handleFilterChange('possession', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Status</option>
            {possessionOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Amenities */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Amenities
        </label>
        <div className="flex flex-wrap gap-2">
          {amenitiesOptions.map(amenity => (
            <button
              key={amenity}
              onClick={() => handleAmenityToggle(amenity)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filters.amenities.includes(amenity)
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {Object.values(filters).some(filter => 
        Array.isArray(filter) ? filter.length > 0 : filter !== ''
      ) && (
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-400">Active filters:</span>
            
            {filters.priceRange && (
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                {priceRanges.find(r => r.value === filters.priceRange)?.label}
              </span>
            )}
            
            {filters.propertyType && (
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                {filters.propertyType}
              </span>
            )}
            
            {filters.location && (
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                {filters.location}
              </span>
            )}
            
            {filters.bhk && (
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                {filters.bhk}
              </span>
            )}
            
            {filters.builder && (
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                {filters.builder}
              </span>
            )}
            
            {filters.possession && (
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                {filters.possession}
              </span>
            )}
            
            {filters.amenities.map(amenity => (
              <span key={amenity} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                {amenity}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;