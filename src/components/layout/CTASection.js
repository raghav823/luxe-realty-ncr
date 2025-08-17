import React, { useState } from 'react';
import { ArrowRight, Phone, Mail, MessageCircle, Star, Shield, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      // Could show success message here
    }, 1000);
  };

  const handleCallbackRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setPhone('');
      // Could show success message here
    }, 1000);
  };

  const benefits = [
    {
      icon: Shield,
      title: "100% Safe Investment",
      description: "RERA approved projects with legal verification"
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Dedicated property consultants at your service"
    },
    {
      icon: Star,
      title: "Best Price Guarantee",
      description: "Get the most competitive prices in the market"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Perfect Property?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who found their dream homes through our platform. 
            Start your property journey today with expert guidance and exclusive deals.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 rounded-xl mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
            <button
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/properties')}
              className="bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 backdrop-blur-sm"
            >
              Browse Properties
            </button>
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Newsletter Signup */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-6">
              <Mail className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Get the latest property listings and market insights delivered to your inbox
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
              </button>
            </form>
          </div>

          {/* Callback Request */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-6">
              <Phone className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Request Callback</h3>
              <p className="text-gray-300">
                Our property experts will call you back within 30 minutes for free consultation
              </p>
            </div>
            
            <form onSubmit={handleCallbackRequest} className="space-y-4">
              <div>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Requesting...' : 'Request Free Callback'}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center">
          <h4 className="text-xl font-semibold text-white mb-6">Need Immediate Assistance?</h4>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a
              href="tel:+919999999999"
              className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>+91 99999 99999</span>
            </a>
            <a
              href="mailto:info@luxerealyncr.com"
              className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>info@luxerealyncr.com</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Live Chat</span>
            </a>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-gray-800">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">Trusted by 10,000+ customers across Delhi NCR</p>
            <div className="flex justify-center items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
              ))}
              <span className="text-gray-300 ml-2">4.8/5 Customer Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;