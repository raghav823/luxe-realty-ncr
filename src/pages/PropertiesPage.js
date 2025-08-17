// src/pages/PropertiesPage.js
import React, { useState, useContext, useMemo } from 'react';
import { PropertyContext } from '../contexts/PropertyContext';
import PropertyFilters from '../components/property/PropertyFilters';
import PropertyGrid from '../components/property/PropertyGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PropertiesPage = () => {
  const { properties, loading } = useContext(PropertyContext);
  const [filters, setFilters] = useState({
    priceRange: '',
    propertyType: '',
    location: '',
    possession: '',
    builder: '',
    bhk: '',
    amenities: []
  });
  const [sortBy, setSortBy] = useState('featured');
  const [viewType, setViewType] = useState('grid');

  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    // Apply filters
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    if (filters.propertyType) {
      filtered = filtered.filter(p => p.type === filters.propertyType);
    }

    if (filters.location) {
      filtered = filtered.filter(p => p.location === filters.location);
    }

    if (filters.possession) {
      filtered = filtered.filter(p => p.possession === filters.possession);
    }

    if (filters.builder) {
      filtered = filtered.filter(p => p.builder === filters.builder);
    }

    if (filters.bhk) {
      filtered = filtered.filter(p => p.bhk === filters.bhk);
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(p => 
        filters.amenities.every(amenity => p.amenities.includes(amenity))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'area':
        filtered.sort((a, b) => b.area - a.area);
        break;
      default:
        // Keep original order for featured
        break;
    }

    return filtered;
  }, [properties, filters, sortBy]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Premium Properties in Delhi NCR
          </h1>
          <p className="text-gray-400 text-lg">
            Discover your dream home from our exclusive collection
          </p>
        </div>

        {/* Filters */}
        <PropertyFilters onFiltersChange={setFilters} />

        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="text-gray-300">
            <span className="font-semibold text-white">{filteredProperties.length}</span> properties found
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="area">Largest Area</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewType('grid')}
                className={`px-3 py-2 text-sm ${
                  viewType === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                } transition-colors`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`px-3 py-2 text-sm ${
                  viewType === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                } transition-colors`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <PropertyGrid properties={filteredProperties} viewType={viewType} />
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-white mb-2">No properties found</h3>
            <p className="text-gray-400">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;