// Location: src/components/dashboard/builder/PropertyManagement.js
import React, { useState, useEffect } from 'react';
import { Edit, Eye, Trash2, MoreVertical, Search, Filter, MapPin, Calendar } from 'lucide-react';
import Button from '../../common/Button';
import Modal from '../../common/Modal';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchTerm, filterStatus]);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/builders/properties', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = () => {
    let filtered = properties;

    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(property => property.status === filterStatus);
    }

    setFilteredProperties(filtered);
  };

  const handleStatusChange = async (propertyId, newStatus) => {
    try {
      const response = await fetch(`/api/properties/${propertyId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchProperties();
        alert('Property status updated successfully');
      }
    } catch (error) {
      console.error('Error updating property status:', error);
      alert('Error updating property status');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/properties/${selectedProperty._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchProperties();
        setShowDeleteModal(false);
        setSelectedProperty(null);
        alert('Property deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Error deleting property');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      available: 'bg-green-100 text-green-800',
      sold: 'bg-red-100 text-red-800',
      rented: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.available;
  };

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={property.images[0] || '/images/placeholder-property.jpg'}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm line-clamp-1">{property.location.city}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-blue-600">
            ₹{(property.price / 10000000).toFixed(1)}Cr
          </span>
          <span className="text-sm text-gray-500">
            {property.specifications.area} sq ft
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>{property.specifications.bedrooms}BHK</span>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(property.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedProperty(property);
                setShowDetailsModal(true);
              }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
              title="Edit Property"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedProperty(property);
                setShowDeleteModal(true);
              }}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Delete Property"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <select
            value={property.status}
            onChange={(e) => handleStatusChange(property._id, e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );

  const PropertyDetailsModal = () => (
    <Modal
      isOpen={showDetailsModal}
      onClose={() => {
        setShowDetailsModal(false);
        setSelectedProperty(null);
      }}
      title="Property Details"
      size="large"
    >
      {selectedProperty && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={selectedProperty.images[0] || '/images/placeholder-property.jpg'}
                alt={selectedProperty.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {selectedProperty.title}
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Price:</span> ₹{(selectedProperty.price / 10000000).toFixed(1)}Cr
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Type:</span> {selectedProperty.type}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Category:</span> {selectedProperty.category}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Area:</span> {selectedProperty.specifications.area} sq ft
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Configuration:</span> {selectedProperty.specifications.bedrooms}BHK
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Location:</span> {selectedProperty.location.address}, {selectedProperty.location.city}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600">{selectedProperty.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProperty.amenities?.map((amenity, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Features</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProperty.features?.map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => {
                setShowDetailsModal(false);
                setSelectedProperty(null);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h2 className="text-xl font-semibold text-gray-900">Property Management</h2>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Properties</option>
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Total: {filteredProperties.length} properties</span>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <div className="w-3 h-3 bg-green-100 rounded-full mr-1"></div>
              Available: {filteredProperties.filter(p => p.status === 'available').length}
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-red-100 rounded-full mr-1"></div>
              Sold: {filteredProperties.filter(p => p.status === 'sold').length}
            </span>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Start by adding your first property'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedProperty(null);
        }}
        title="Delete Property"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Are you sure you want to delete this property?
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            This action cannot be undone. The property "{selectedProperty?.title}" will be permanently removed.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedProperty(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete Property
            </Button>
          </div>
        </div>
      </Modal>

      {/* Property Details Modal */}
      <PropertyDetailsModal />
    </div>
  );
};

export default PropertyManagement;