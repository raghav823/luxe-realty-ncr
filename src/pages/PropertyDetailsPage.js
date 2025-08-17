// src/pages/PropertyDetailsPage.js
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PropertyContext } from '../contexts/PropertyContext';
import { AuthContext } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PropertyImageGallery from '../components/property/PropertyImageGallery';
import PropertyAmenities from '../components/property/PropertyAmenities';
import PropertyLocation from '../components/property/PropertyLocation';
import InquiryForm from '../components/forms/InquiryForm';
import EMICalculator from '../components/forms/EMICalculator';
import ContactForm from '../components/forms/ContactForm';
import Button from '../components/common/Button';
import { formatPrice, formatArea } from '../utils/helpers';
import toast from 'react-hot-toast';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const { properties } = useContext(PropertyContext);
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showEMICalculator, setShowEMICalculator] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const foundProperty = properties.find(p => p.id === parseInt(id));
    setProperty(foundProperty);
  }, [id, properties]);

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error('Please login to add to wishlist');
      return;
    }
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleScheduleVisit = () => {
    if (!user) {
      toast.error('Please login to schedule a visit');
      return;
    }
    setShowInquiryForm(true);
  };

  if (!property) {
    return <LoadingSpinner />;
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'location', label: 'Location' },
    { id: 'emi', label: 'EMI Calculator' },
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {property.title}
              </h1>
              <p className="text-gray-400 text-lg mb-4">{property.location}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full">
                  {property.type}
                </span>
                <span>{property.bhk}</span>
                <span>{formatArea(property.area)}</span>
                <span>RERA: {property.reraId}</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-white mb-2">
                {formatPrice(property.price)}
              </div>
              <div className="text-gray-400">
                ₹{Math.round(property.price / property.area).toLocaleString()}/sq ft
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={handleAddToWishlist}
                  className="flex items-center gap-2"
                >
                  <span>{isWishlisted ? '❤️' : '🤍'}</span>
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <PropertyImageGallery images={property.images} title={property.title} />

            {/* Tabs */}
            <div className="mt-8">
              <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="card">
                      <h3 className="text-xl font-semibold text-white mb-4">Property Details</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-gray-400 text-sm">Built-up Area</div>
                          <div className="text-white font-semibold">{formatArea(property.area)}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Configuration</div>
                          <div className="text-white font-semibold">{property.bhk}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Possession</div>
                          <div className="text-white font-semibold">{property.possession}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Facing</div>
                          <div className="text-white font-semibold">{property.facing || 'North'}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Floor</div>
                          <div className="text-white font-semibold">{property.floor || '10th of 15'}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Parking</div>
                          <div className="text-white font-semibold">{property.parking || 'Covered'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {property.description || `Experience luxury living at ${property.title}. This premium ${property.bhk} apartment offers spacious interiors, modern amenities, and excellent connectivity. Located in the heart of ${property.location}, it provides the perfect blend of comfort and convenience for modern families.`}
                      </p>
                    </div>

                    <div className="card">
                      <h3 className="text-xl font-semibold text-white mb-4">Builder Information</h3>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🏗️</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold text-lg">{property.builder}</div>
                          <div className="text-gray-400">Trusted Builder</div>
                          <div className="text-sm text-gray-500 mt-1">
                            25+ years of experience • 100+ projects delivered
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'amenities' && <PropertyAmenities amenities={property.amenities} />}
                {activeTab === 'location' && <PropertyLocation property={property} />}
                {activeTab === 'emi' && <EMICalculator price={property.price} />}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="card sticky top-24">
              <h3 className="text-xl font-semibold text-white mb-4">Contact Builder</h3>
              <div className="space-y-4">
                <Button
                  variant="primary"
                  onClick={handleScheduleVisit}
                  className="w-full"
                >
                  Schedule Site Visit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowEMICalculator(true)}
                  className="w-full"
                >
                  Calculate EMI
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => window.open(`tel:+919876543210`)}
                  className="w-full"
                >
                  📞 Call Now
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => window.open(`https://wa.me/919876543210?text=Interested in ${property.title}`)}
                  className="w-full"
                >
                  💬 WhatsApp
                </Button>
              </div>
            </div>

            {/* Similar Properties */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4">Similar Properties</h3>
              <div className="space-y-4">
                {properties
                  .filter(p => p.id !== property.id && p.location === property.location)
                  .slice(0, 3)
                  .map(similarProperty => (
                    <div key={similarProperty.id} className="flex gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                      <img
                        src={similarProperty.images[0]}
                        alt={similarProperty.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm line-clamp-1">
                          {similarProperty.title}
                        </h4>
                        <p className="text-gray-400 text-xs">{similarProperty.bhk}</p>
                        <p className="text-blue-400 font-semibold text-sm">
                          {formatPrice(similarProperty.price)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showInquiryForm && (
        <InquiryForm
          property={property}
          onClose={() => setShowInquiryForm(false)}
        />
      )}

      {showEMICalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">EMI Calculator</h3>
              <button
                onClick={() => setShowEMICalculator(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <EMICalculator price={property.price} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsPage;