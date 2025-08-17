import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { ChevronLeft, ChevronRight, Grid, List } from 'lucide-react';

const PropertyGrid = ({ 
  properties = [], 
  loading = false, 
  error = null,
  onLoadMore = null,
  hasMore = false,
  viewMode = 'grid' // 'grid' or 'list'
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState(viewMode);
  const [itemsPerPage] = useState(12);

  // Calculate pagination
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [properties]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 max-w-md mx-auto">
          <h3 className="text-red-400 font-semibold mb-2">Error Loading Properties</h3>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gray-800 rounded-xl p-12 max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-white font-semibold mb-2">No Properties Found</h3>
          <p className="text-gray-400 mb-6">
            Try adjusting your search criteria or filters to find more properties.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Reset Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Mode Toggle & Results Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <p className="text-gray-300">
            Showing <span className="text-white font-semibold">{startIndex + 1}-{Math.min(endIndex, properties.length)}</span> of{' '}
            <span className="text-white font-semibold">{properties.length}</span> properties
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-gray-400 text-sm">View:</span>
          <div className="bg-gray-800 rounded-lg p-1 flex">
            <button
              onClick={() => setDisplayMode('grid')}
              className={`p-2 rounded transition-colors ${
                displayMode === 'grid'
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDisplayMode('list')}
              className={`p-2 rounded transition-colors ${
                displayMode === 'list'
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid/List */}
      <div className={
        displayMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
          : 'space-y-6'
      }>
        {currentProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            viewMode={displayMode}
          />
        ))}
      </div>

      {/* Load More Button (if using infinite scroll) */}
      {onLoadMore && hasMore && (
        <div className="text-center py-8">
          <button
            onClick={onLoadMore}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105"
          >
            Load More Properties
          </button>
        </div>
      )}

      {/* Pagination (if not using infinite scroll) */}
      {!onLoadMore && totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 py-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {/* Page Numbers */}
            {(() => {
              const pages = [];
              const maxVisible = 5;
              let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
              let endPage = Math.min(totalPages, startPage + maxVisible - 1);

              if (endPage - startPage + 1 < maxVisible) {
                startPage = Math.max(1, endPage - maxVisible + 1);
              }

              // First page
              if (startPage > 1) {
                pages.push(
                  <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className="w-10 h-10 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    1
                  </button>
                );
                if (startPage > 2) {
                  pages.push(
                    <span key="dots1" className="text-gray-500 px-2">...</span>
                  );
                }
              }

              // Visible pages
              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      i === currentPage
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {i}
                  </button>
                );
              }

              // Last page
              if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                  pages.push(
                    <span key="dots2" className="text-gray-500 px-2">...</span>
                  );
                }
                pages.push(
                  <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="w-10 h-10 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    {totalPages}
                  </button>
                );
              }

              return pages;
            })()}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Results Summary */}
      <div className="text-center text-gray-400 text-sm">
        {properties.length > 0 && (
          <p>
            Displaying {currentProperties.length} properties
            {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default PropertyGrid;