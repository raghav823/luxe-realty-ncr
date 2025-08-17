import React, { useState } from 'react';
import { Building2, User, ArrowRight, Check, Upload, Search, Heart, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserTypeSelection = ({ onSelectUserType }) => {
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();

  const userTypes = [
    {
      id: 'customer',
      title: 'Property Customer',
      subtitle: 'Looking to buy or invest in properties',
      icon: User,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700',
      features: [
        { icon: Search, text: 'Browse premium properties' },
        { icon: Heart, text: 'Create wishlists & favorites' },
        { icon: BarChart3, text: 'Track investment portfolio' },
        { icon: Check, text: 'Get expert guidance' }
      ],
      description: 'Perfect for individuals and families looking to buy their dream home or make smart property investments.',
      benefits: [
        'Access to verified RERA approved projects',
        'Personalized property recommendations',
        'Investment tracking and portfolio management',
        'Direct connect with verified builders',
        'Expert consultation and site visits'
      ]
    },
    {
      id: 'builder',
      title: 'Property Builder',
      subtitle: 'Showcase and sell your projects',
      icon: Building2,
      color: 'from-amber-500 to-amber-600',
      hoverColor: 'from-amber-600 to-amber-700',
      features: [
        { icon: Upload, text: 'Upload & manage projects' },
        { icon: BarChart3, text: 'Track inquiries & analytics' },
        { icon: User, text: 'Connect with customers' },
        { icon: Check, text: 'RERA verification support' }
      ],
      description: 'Ideal for builders, developers, and real estate companies looking to showcase their projects to potential buyers.',
      benefits: [
        'Showcase projects to targeted audience',
        'Advanced analytics and lead tracking',
        'Direct customer inquiries management',
        'Professional project presentation tools',
        'Marketing support and promotion'
      ]
    }
  ];

  const handleContinue = () => {
    if (selectedType) {
      onSelectUserType(selectedType);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Account Type
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select how you want to use Luxe Realty NCR platform to get personalized experience
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {userTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedType === type.id ? 'ring-4 ring-amber-400' : ''
              }`}
            >
              <div className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border-2 transition-all duration-300 ${
                selectedType === type.id 
                  ? 'border-amber-400 bg-white/10' 
                  : 'border-white/10 hover:border-white/30'
              }`}>
                {/* Selection Indicator */}
                {selectedType === type.id && (
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-2 rounded-full">
                    <Check className="w-5 h-5" />
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${type.color} mb-6`}>
                    <type.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{type.title}</h3>
                  <p className="text-gray-300 text-lg">{type.subtitle}</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${type.color}`}>
                        <feature.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-300">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-400 text-center mb-6">
                  {type.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  <h4 className="text-white font-semibold mb-3">Key Benefits:</h4>
                  {type.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className={`inline-flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
              selectedType
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transform hover:scale-105'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue with {selectedType ? userTypes.find(t => t.id === selectedType)?.title : 'Selection'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          
          <p className="text-gray-400 text-sm mt-4">
            You can change your account type later from settings
          </p>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;