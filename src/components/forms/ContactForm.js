// src/components/forms/ContactForm.js
import React, { useState } from 'react';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const ContactForm = ({ onClose, title = "Get in Touch" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'email',
        urgency: 'normal'
      });
      
      if (onClose) onClose();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="john@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select subject</option>
                <option value="general-inquiry">General Inquiry</option>
                <option value="property-inquiry">Property Inquiry</option>
                <option value="site-visit">Site Visit Request</option>
                <option value="pricing">Pricing Information</option>
                <option value="emi-details">EMI Details</option>
                <option value="legal-docs">Legal Documentation</option>
                <option value="complaint">Complaint/Issue</option>
                <option value="feedback">Feedback</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Priority
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="input-field"
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Preferred Contact Method
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact === 'email'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className={`w-4 h-4 rounded-full border-2 mr-2 ${
                  formData.preferredContact === 'email' 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-gray-600'
                }`}></span>
                <span className="text-gray-300">📧 Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  checked={formData.preferredContact === 'phone'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className={`w-4 h-4 rounded-full border-2 mr-2 ${
                  formData.preferredContact === 'phone' 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-gray-600'
                }`}></span>
                <span className="text-gray-300">📞 Phone</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="whatsapp"
                  checked={formData.preferredContact === 'whatsapp'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className={`w-4 h-4 rounded-full border-2 mr-2 ${
                  formData.preferredContact === 'whatsapp' 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-gray-600'
                }`}></span>
                <span className="text-gray-300">💬 WhatsApp</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="input-field resize-none"
              placeholder="Please provide detailed information about your inquiry..."
            ></textarea>
            <div className="text-right text-xs text-gray-500 mt-1">
              {formData.message.length}/500 characters
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            {onClose && (
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className={onClose ? "flex-1" : "w-full"}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </Button>
          </div>
        </form>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Other Ways to Reach Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <span className="text-2xl">📞</span>
              <div>
                <div className="text-white font-semibold">Phone</div>
                <div className="text-gray-400 text-sm">+91 98765 43210</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <span className="text-2xl">📧</span>
              <div>
                <div className="text-white font-semibold">Email</div>
                <div className="text-gray-400 text-sm">info@luxerealtyner.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <span className="text-2xl">📍</span>
              <div>
                <div className="text-white font-semibold">Office</div>
                <div className="text-gray-400 text-sm">Gurgaon, Delhi NCR</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;