// src/components/property/PropertyLocation.js
import React, { useState } from 'react';

const PropertyLocation = ({ property }) => {
  const [activeTab, setActiveTab] = useState('connectivity');

  // Mock location data - in real app, this would come from property data or API
  const locationData = {
    connectivity: [
      { type: 'Metro Station', name: 'Rajiv Gandhi Chowk', distance: '0.5 km', time: '5 min walk' },
      { type: 'Bus Stop', name: 'Sector 14', distance: '0.2 km', time: '2 min walk' },
      { type: 'Highway', name: 'NH-8', distance: '2 km', time: '5 min drive' },
      { type: 'Airport', name: 'IGI Airport', distance: '25 km', time: '45 min drive' },
      { type: 'Railway Station', name: 'Gurgaon Railway Station', distance: '8 km', time: '20 min drive' }
    ],
    schools: [
      { name: 'DPS Gurgaon', distance: '1.2 km', rating: 4.5 },
      { name: 'Ryan International School', distance: '2.1 km', rating: 4.3 },
      { name: 'The Shri Ram School', distance: '3.5 km', rating: 4.7 },
      { name: 'Amity International School', distance: '4.2 km', rating: 4.2 }
    ],
    hospitals: [
      { name: 'Fortis Hospital', distance: '2.1 km', specialty: 'Multi-specialty' },
      { name: 'Max Hospital', distance: '3.5 km', specialty: 'Super-specialty' },
      { name: 'Medanta Hospital', distance: '8.2 km', specialty: 'Multi-specialty' },
      { name: 'Columbia Asia Hospital', distance: '4.1 km', specialty: 'General' }
    ],
    shopping: [
      { name: 'DLF Cyber Hub', distance: '3.2 km', type: 'Mall & Dining' },
      { name: 'Ambience Mall', distance: '5.1 km', type: 'Shopping Mall' },
      { name: 'DLF Mall of India', distance: '12 km', type: 'Mega Mall' },
      { name: 'Sector 14 Market', distance: '0.8 km', type: 'Local Market' }
    ],
    entertainment: [
      { name: 'PVR Cinemas', distance: '2.1 km', type: 'Cinema' },
      { name: 'Kingdom of Dreams', distance: '6.5 km', type: 'Entertainment' },
      { name: 'Leisure Valley Park', distance: '1.8 km', type: 'Park' },
      { name: 'Golf Course Road', distance: '4.2 km', type: 'Recreation' }
    ]
  };

  const tabs = [
    { id: 'connectivity', label: 'Connectivity', icon: '🚇' },
    { id: 'schools', label: 'Schools', icon: '🏫' },
    { id: 'hospitals', label: 'Hospitals', icon: '🏥' },
    { id: 'shopping', label: 'Shopping', icon: '🛒' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎬' }
  ];

  const renderConnectivity = () => (
    <div className="space-y-4">
      {locationData.connectivity.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">
                {item.type === 'Metro Station' ? '🚇' :
                 item.type === 'Bus Stop' ? '🚌' :
                 item.type === 'Highway' ? '🛣️' :
                 item.type === 'Airport' ? '✈️' : '🚂'}
              </span>
            </div>
            <div>
              <h4 className="text-white font-semibold">{item.name}</h4>
              <p className="text-gray-400 text-sm">{item.type}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-blue-400 font-semibold">{item.distance}</div>
            <div className="text-gray-400 text-sm">{item.time}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSchools = () => (
    <div className="space-y-4">
      {locationData.schools.map((school, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🏫</span>
            </div>
            <div>
              <h4 className="text-white font-semibold">{school.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-400">★</span>
                <span className="text-gray-400 text-sm">{school.rating}/5</span>
              </div>
            </div>
          </div>
          <div className="text-blue-400 font-semibold">{school.distance}</div>
        </div>
      ))}
    </div>
  );

  const renderHospitals = () => (
    <div className="space-y-4">
      {locationData.hospitals.map((hospital, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🏥</span>
            </div>
            <div>
              <h4 className="text-white font-semibold">{hospital.name}</h4>
              <p className="text-gray-400 text-sm">{hospital.specialty}</p>
            </div>
          </div>
          <div className="text-blue-400 font-semibold">{hospital.distance}</div>
        </div>
      ))}
    </div>
  );

  const renderShopping = () => (
    <div className="space-y-4">
      {locationData.shopping.map((place, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🛒</span>
            </div>
            <div>
              <h4 className="text-white font-semibold">{place.name}</h4>
              <p className="text-gray-400 text-sm">{place.type}</p>
            </div>
          </div>
          <div className="text-blue-400 font-semibold">{place.distance}</div>
        </div>
      ))}
    </div>
  );

  const renderEntertainment = () => (
    <div className="space-y-4">
      {locationData.entertainment.map((place, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🎬</span>
            </div>
            <div>
              <h4 className="text-white font-semibold">{place.name}</h4>
              <p className="text-gray-400 text-sm">{place.type}</p>
            </div>
          </div>
          <div className="text-blue-400 font-semibold">{place.distance}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Location Map Placeholder */}
      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-4">Location</h3>
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h4 className="text-white font-semibold mb-2">{property.location}</h4>
          <p className="text-gray-400 mb-4">Interactive map integration coming soon</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            View on Google Maps
          </button>
        </div>
      </div>

      {/* Location Tabs */}
      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-6">Nearby Places</h3>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'connectivity' && renderConnectivity()}
          {activeTab === 'schools' && renderSchools()}
          {activeTab === 'hospitals' && renderHospitals()}
          {activeTab === 'shopping' && renderShopping()}
          {activeTab === 'entertainment' && renderEntertainment()}
        </div>
      </div>

      {/* Location Highlights */}
      <div className="card bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
        <h3 className="text-xl font-semibold text-white mb-4">Location Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚇</span>
            <div>
              <h4 className="text-white font-semibold">Excellent Connectivity</h4>
              <p className="text-gray-400 text-sm">Metro station within 500m</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏫</span>
            <div>
              <h4 className="text-white font-semibold">Top Schools Nearby</h4>
              <p className="text-gray-400 text-sm">Premium educational institutes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏥</span>
            <div>
              <h4 className="text-white font-semibold">Healthcare Access</h4>
              <p className="text-gray-400 text-sm">Multi-specialty hospitals nearby</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛒</span>
            <div>
              <h4 className="text-white font-semibold">Shopping & Dining</h4>
              <p className="text-gray-400 text-sm">Malls and restaurants nearby</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyLocation;