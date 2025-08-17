import React, { createContext, useContext, useState, useEffect } from 'react';
import { propertyService } from '../services/propertyService';
import { sampleProperties } from '../utils/sampleData';
import toast from 'react-hot-toast';

const PropertyContext = createContext();

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(sampleProperties);
  const [filteredProperties, setFilteredProperties] = useState(sampleProperties);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: [0, 50000000],
    possession: '',
    builder: '',
    searchQuery: ''
  });
  
  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, properties]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      // In production, this would fetch from API
      // const response = await propertyService.getAllProperties();
      // setProperties(response.data);
      
      // For now, using sample data
      setProperties(sampleProperties);
    } catch (error) {
      console.error('Error loading properties:', error);
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    // Search query filter
    if (filters.searchQuery) {
      filtered = filtered.filter(property =>
        property.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        property.location.area.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        property.location.city.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        property.builderName.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.location.area.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Property type filter
    if (filters.propertyType) {
      filtered = filtered.filter(property =>
        property.propertyType.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    // Price range filter
    filtered = filtered.filter(property =>
      property.priceRange.min >= filters.priceRange[0] &&
      property.priceRange.max <= filters.priceRange[1]
    );

    // Possession filter
    if (filters.possession) {
      filtered = filtered.filter(property =>
        property.possessionDate.includes(filters.possession)
      );
    }

    // Builder filter
    if (filters.builder) {
      filtered = filtered.filter(property =>
        property.builderName.toLowerCase().includes(filters.builder.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  };

  const updateFilters = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      priceRange: [0, 50000000],
      possession: '',
      builder: '',
      searchQuery: ''
    });
  };

  const getPropertyById = (id) => {
    return properties.find(property => property.id === id);
  };

  const getFeaturedProperties = () => {
    return properties.filter(property => property.featured).slice(0, 6);
  };

  const getUpcomingProperties = () => {
    return properties.filter(property => 
      new Date(property.possessionDate) > new Date()
    ).slice(0, 8);
  };

  const getPropertiesByBuilder = (builderId) => {
    return properties.filter(property => property.builderId === builderId);
  };

  const addProperty = async (propertyData) => {
    try {
      setLoading(true);
      // In production, this would make API call
      // const response = await propertyService.createProperty(propertyData);
      
      const newProperty = {
        ...propertyData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        views: 0,
        inquiries: 0
      };
      
      setProperties(prev => [newProperty, ...prev]);
      toast.success('Property added successfully!');
      return { success: true, property: newProperty };
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error('Failed to add property');
      return { success: false, message: 'Failed to add property' };
    } finally {
      setLoading(false);
    }
  };

  const updateProperty = async (id, updateData) => {
    try {
      setLoading(true);
      setProperties(prev =>
        prev.map(property =>
          property.id === id ? { ...property, ...updateData } : property
        )
      );
      toast.success('Property updated successfully!');
      return { success: true };
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Failed to update property');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    try {
      setProperties(prev => prev.filter(property => property.id !== id));
      toast.success('Property deleted successfully!');
      return { success: true };
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
      return { success: false };
    }
  };

  const incrementViews = (id) => {
    setProperties(prev =>
      prev.map(property =>
        property.id === id ? { ...property, views: (property.views || 0) + 1 } : property
      )
    );
  };

  const value = {
    properties,
    filteredProperties,
    loading,
    filters,
    updateFilters,
    clearFilters,
    getPropertyById,
    getFeaturedProperties,
    getUpcomingProperties,
    getPropertiesByBuilder,
    addProperty,
    updateProperty,
    deleteProperty,
    incrementViews,
    loadProperties
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};