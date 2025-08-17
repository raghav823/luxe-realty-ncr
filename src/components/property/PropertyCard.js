import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Building2, 
  Calendar, 
  Eye, 
  MessageSquare, 
  Star,
  Crown,
  TrendingUp
} from 'lucide-react';

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready to Move':
        return 'bg-green-500';
      case 'Under Construction':
        return 'bg-blue-500';
      case 'Pre-Launch':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="property-card card-luxury group">
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-xl">
        <div className="property-image aspect-[4/3] bg-gradient-to-br from-dark-700 to-dark-600">
          {property.images && property.images[0] ? (
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&auto=format`;
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-dark-700 to-dark-600 flex items-center justify-center">
              <Building2 className="h-16 w-16 text-dark-400" />
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(property.status)}`}>
            {property.status}
          </span>
        </div>

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-4 right-4">
            <div className="bg-gold-500 text-white p-2 rounded-full shadow-lg">
              <Crown className="h-4 w-4" />
            </div>
          </div>
        )}

        {/* Property Stats Overlay */}
        <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center space-x-1">
            <Eye className="h-3 w-3" />
            <span>{property.views || 0}</span>
          </div>
          <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center space-x-1">
            <MessageSquare className="h-3 w-3" />
            <span>{property.inquiries || 0}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors duration-200 line-clamp-1">
              {property.name}
            </h3>
            <p className="text-gray-400 text-sm mt-1">{property.builderName}</p>
          </div>
          {property.builderName === 'DLF Limited' || property.builderName === 'Godrej Properties' ? (
            <div className="bg-gold-500/20 text-gold-400 px-2 py-1 rounded-lg text-xs font-medium">
              Premium
            </div>
          ) : null}
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-400 mb-4">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm line-clamp-1">
            {property.location.area}, {property.location.city}
          </span>
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gold-400">
                {formatPrice(property.priceRange.min)}
              </span>
              {property.priceRange.min !== property.priceRange.max && (
                <span className="text-gray-400 ml-1">
                  - {formatPrice(property.priceRange.max)}
                </span>
              )}
            </div>
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>15% ROI</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {property.configurations.join(', ')}
          </p>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center text-gray-400">
            <Building2 className="h-4 w-4 mr-2" />
            <span>{property.propertyType}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{new Date(property.possessionDate).getFullYear()}</span>
          </div>
        </div>

        {/* Amenities Preview */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span 
                key={index}
                className="bg-dark-800 text-gray-300 px-2 py-1 rounded-lg text-xs"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="bg-dark-800 text-gold-400 px-2 py-1 rounded-lg text-xs">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link
            to={`/properties/${property.id}`}
            className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white py-3 px-4 rounded-lg font-semibold text-center transition-all duration-200 hover:shadow-lg transform hover:scale-105"
          >
            View Details
          </Link>
          <button className="bg-dark-800 hover:bg-dark-700 text-gray-300 hover:text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 border border-dark-600 hover:border-dark-500">
            <MessageSquare className="h-4 w-4" />
          </button>
        </div>

        {/* RERA ID */}
        {property.reraId && (
          <div className="mt-4 pt-4 border-t border-dark-700">
            <p className="text-xs text-gray-500">
              RERA ID: {property.reraId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;