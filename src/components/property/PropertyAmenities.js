// src/components/property/PropertyAmenities.js
import React from 'react';

const PropertyAmenities = ({ amenities }) => {
  // Amenity icons mapping
  const amenityIcons = {
    'Swimming Pool': '🏊‍♂️',
    'Gym': '🏋️‍♂️',
    'Club House': '🏛️',
    'Parking': '🚗',
    'Security': '🔒',
    'Power Backup': '⚡',
    'Lift': '🛗',
    'Garden': '🌳',
    'Kids Play Area': '🎪',
    'Sports Facility': '⚽',
    'Shopping Center': '🛒',
    'Hospital': '🏥',
    'School': '🏫',
    'Restaurant': '🍽️',
    'ATM': '🏧',
    'Fire Safety': '🧯',
    'CCTV': '📹',
    'Intercom': '📞',
    'Maintenance': '🔧',
    'Housekeeping': '🧹',
    'Concierge': '🛎️',
    'Business Center': '💼',
    'Spa': '💆‍♀️',
    'Jogging Track': '🏃‍♂️',
    'Yoga Room': '🧘‍♀️',
    'Library': '📚',
    'Banquet Hall': '🎉',
    'Guest Rooms': '🏨',
    'Amphitheater': '🎭',
    'Tennis Court': '🎾',
    'Basketball Court': '🏀',
    'Badminton Court': '🏸',
    'Squash Court': '🎾',
    'Meditation Area': '🧘‍♀️',
    'Senior Citizen Area': '👴',
    'Pet Park': '🐕',
    'Cycling Track': '🚴‍♂️',
    'Water Harvesting': '💧',
    'Solar Panels': '☀️',
    'Waste Management': '♻️',
    'EV Charging': '🔌'
  };

  // Group amenities by category
  const categorizeAmenities = (amenities) => {
    const categories = {
      'Recreation & Sports': [
        'Swimming Pool', 'Gym', 'Sports Facility', 'Tennis Court', 'Basketball Court', 
        'Badminton Court', 'Squash Court', 'Jogging Track', 'Cycling Track', 'Yoga Room'
      ],
      'Safety & Security': [
        'Security', 'CCTV', 'Fire Safety', 'Intercom'
      ],
      'Convenience': [
        'Parking', 'Lift', 'Power Backup', 'ATM', 'Shopping Center', 
        'Maintenance', 'Housekeeping', 'Concierge', 'EV Charging'
      ],
      'Community & Social': [
        'Club House', 'Banquet Hall', 'Guest Rooms', 'Amphitheater', 'Business Center',
        'Library', 'Senior Citizen Area'
      ],
      'Family & Kids': [
        'Kids Play Area', 'Pet Park', 'Garden'
      ],
      'Health & Wellness': [
        'Hospital', 'Spa', 'Meditation Area'
      ],
      'Educational': [
        'School'
      ],
      'Dining': [
        'Restaurant'
      ],
      'Sustainability': [
        'Water Harvesting', 'Solar Panels', 'Waste Management'
      ]
    };

    const categorized = {};
    
    amenities.forEach(amenity => {
      let placed = false;
      Object.entries(categories).forEach(([category, items]) => {
        if (items.includes(amenity)) {
          if (!categorized[category]) categorized[category] = [];
          categorized[category].push(amenity);
          placed = true;
        }
      });
      
      // If amenity doesn't fit any category, put it in "Other"
      if (!placed) {
        if (!categorized['Other']) categorized['Other'] = [];
        categorized['Other'].push(amenity);
      }
    });

    return categorized;
  };

  const categorizedAmenities = categorizeAmenities(amenities);

  return (
    <div className="space-y-6">
      {Object.entries(categorizedAmenities).map(([category, items]) => (
        <div key={category} className="card">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-400">•</span>
            {category}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <span className="text-2xl">
                  {amenityIcons[amenity] || '🏠'}
                </span>
                <span className="text-white font-medium">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Amenities Summary */}
      <div className="card bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🌟</div>
          <div>
            <h4 className="text-xl font-semibold text-white mb-1">Premium Amenities</h4>
            <p className="text-gray-300">
              {amenities.length} world-class amenities designed for modern luxury living
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAmenities;