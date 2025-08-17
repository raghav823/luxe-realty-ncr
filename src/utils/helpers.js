// src/utils/helpers.js

// Format price in Indian currency format
export const formatPrice = (price) => {
    if (price >= 10000000) { // 1 crore
      return `₹${(price / 10000000).toFixed(price % 10000000 === 0 ? 0 : 1)} Cr`;
    } else if (price >= 100000) { // 1 lakh
      return `₹${(price / 100000).toFixed(price % 100000 === 0 ? 0 : 1)} L`;
    } else if (price >= 1000) { // 1 thousand
      return `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)} K`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };
  
  // Format area
  export const formatArea = (area) => {
    return `${area.toLocaleString()} sq ft`;
  };
  
  // Calculate EMI
  export const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / (12 * 100);
    const months = tenure * 12;
    
    if (monthlyRate === 0) return principal / months;
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    return Math.round(emi);
  };
  
  // Format date
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format relative time
  export const formatRelativeTime = (date) => {
    const now = new Date();
    const inputDate = new Date(date);
    const diffInSeconds = Math.floor((now - inputDate) / 1000);
  
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return formatDate(date);
  };
  
  // Truncate text
  export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };
  
  // Generate slug from title
  export const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };
  
  // Validate email
  export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validate phone number (Indian format)
  export const isValidPhone = (phone) => {
    const phoneRegex = /^[+]?[91]?[789]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };
  
  // Format phone number
  export const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
  };
  
  // Calculate property investment returns
  export const calculateReturns = (purchasePrice, currentPrice, years) => {
    const totalReturn = currentPrice - purchasePrice;
    const totalReturnPercentage = (totalReturn / purchasePrice) * 100;
    const annualizedReturn = Math.pow(currentPrice / purchasePrice, 1 / years) - 1;
    
    return {
      totalReturn,
      totalReturnPercentage: totalReturnPercentage.toFixed(2),
      annualizedReturn: (annualizedReturn * 100).toFixed(2)
    };
  };
  
  // Get property status badge color
  export const getStatusBadgeColor = (status) => {
    const colors = {
      'Ready to Move': 'bg-green-600',
      'Under Construction': 'bg-yellow-600',
      'New Launch': 'bg-blue-600',
      'Resale': 'bg-purple-600',
      'Sold': 'bg-red-600'
    };
    return colors[status] || 'bg-gray-600';
  };
  
  // Get property type icon
  export const getPropertyTypeIcon = (type) => {
    const icons = {
      'Apartment': '🏢',
      'Villa': '🏡',
      'Plot': '📍',
      'Office': '🏢',
      'Shop': '🏪',
      'Warehouse': '🏭',
      'Showroom': '🏬',
      'Studio': '🏠',
      'Penthouse': '🏙️'
    };
    return icons[type] || '🏠';
  };
  
  // Debounce function
  export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  // Throttle function
  export const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };
  
  // Get distance between two coordinates
  export const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  
  // Format file size
  export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Generate random ID
  export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  
  // Local storage helpers
  export const storage = {
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    },
    get: (key, defaultValue = null) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
      }
    },
    remove: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    },
    clear: () => {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
  };
  
  // Copy to clipboard
  export const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        return true;
      } catch (fallbackErr) {
        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };
  
  // Image optimization helper
  export const getOptimizedImageUrl = (url, width = 400, quality = 80) => {
    // This would typically integrate with an image optimization service
    // For now, return the original URL
    return url;
  };
  
  // URL helpers
  export const buildUrl = (base, params = {}) => {
    const url = new URL(base);
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        url.searchParams.append(key, params[key]);
      }
    });
    return url.toString();
  };
  
  // Social share helpers
  export const shareOnSocial = (platform, url, title, description) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
  
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
    };
  
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };ppe