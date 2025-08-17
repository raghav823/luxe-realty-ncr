import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'gold' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const colorClasses = {
    gold: 'border-gold-500',
    white: 'border-white',
    gray: 'border-gray-500'
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-t-transparent ${colorClasses[color]}`}>
    </div>
  );
};

export default LoadingSpinner;