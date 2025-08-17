import React from 'react';
import { TrendingUp, Building, Users, Award } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Building,
      number: "500+",
      label: "Premium Properties",
      description: "Luxury residential & commercial"
    },
    {
      icon: Users,
      number: "10K+",
      label: "Happy Customers",
      description: "Trusted by families across NCR"
    },
    {
      icon: TrendingUp,
      number: "₹2000Cr+",
      label: "Portfolio Value",
      description: "Total investment managed"
    },
    {
      icon: Award,
      number: "50+",
      label: "Verified Builders",
      description: "RERA approved projects only"
    }
  ];

  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-transparent to-amber-500"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Leading Real Estate Platform in NCR
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Trusted by thousands of customers and builders for premium property investments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group cursor-pointer"
            >
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 rounded-xl group-hover:shadow-lg group-hover:shadow-amber-500/25 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                    {stat.number}
                  </h3>
                  <h4 className="text-xl font-semibold text-gray-200">
                    {stat.label}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-gray-800">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-6">
              Trusted & Verified Platform
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">RERA Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Bank Approved</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Legal Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Premium Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;