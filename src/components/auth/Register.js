import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Eye, 
  EyeOff, 
  Crown, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Building2,
  Users,
  ArrowRight,
  Check
} from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const Register = () => {
  const [step, setStep] = useState(1); // 1: User Type, 2: Registration Form
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '', // For builders
    experience: '', // For builders
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { register, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Enter valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (userType === 'builder') {
      if (!formData.companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
      if (!formData.experience) {
        newErrors.experience = 'Experience is required';
      }
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const registrationData = {
      ...formData,
      userType
    };

    const result = await register(registrationData);
    
    if (result.success) {
      const user = result.user;
      if (user.userType === 'builder') {
        navigate('/builder/dashboard');
      } else if (user.userType === 'customer') {
        navigate('/customer/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const userTypes = [
    {
      type: 'customer',
      title: 'Property Investor',
      description: 'Looking to invest in upcoming properties',
      icon: Users,
      features: [
        'Browse premium properties',
        'Track investment portfolio',
        'Get expert guidance',
        'Access exclusive deals'
      ]
    },
    {
      type: 'builder',
      title: 'Property Builder',
      description: 'List and manage your property projects',
      icon: Building2,
      features: [
        'List unlimited properties',
        'Manage project details',
        'Track customer inquiries',
        'Analytics dashboard'
      ]
    }
  ];

  // Step 1: User Type Selection
  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dark-950">
        <div className="max-w-4xl w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-3 group mb-8">
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 p-3 rounded-lg group-hover:shadow-lg transition-all duration-200">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gradient">LuxeRealty</span>
                <span className="text-sm text-gray-400 -mt-1">NCR</span>
              </div>
            </Link>
            
            <h2 className="text-3xl font-bold text-white mb-2">
              Join LuxeRealty NCR
            </h2>
            <p className="text-gray-400">
              Choose your account type to get started
            </p>
          </div>

          {/* User Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {userTypes.map((type) => (
              <div
                key={type.type}
                onClick={() => {
                  setUserType(type.type);
                  setStep(2);
                }}
                className={`card-luxury p-8 cursor-pointer hover-lift transition-all duration-300 ${
                  userType === type.type ? 'ring-2 ring-gold-500 border-gold-500' : ''
                }`}
              >
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-br from-gold-500 to-gold-600 p-4 rounded-xl inline-block mb-4">
                    <type.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{type.title}</h3>
                  <p className="text-gray-400">{type.description}</p>
                </div>

                <ul className="space-y-3">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-300">
                      <Check className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full mt-6 btn-primary">
                  Continue as {type.title}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-gold-400 hover:text-gold-300 font-semibold transition-colors duration-200">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Registration Form
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dark-950">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-gold-400 mb-6 transition-colors duration-200"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>Back to user type</span>
          </button>

          <div className="bg-gradient-to-br from-gold-400 to-gold-600 p-3 rounded-lg inline-block mb-4">
            {userType === 'builder' ? <Building2 className="h-8 w-8 text-white" /> : <Users className="h-8 w-8 text-white" />}
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            Create {userType === 'builder' ? 'Builder' : 'Investor'} Account
          </h2>
          <p className="text-gray-400">
            Fill in your details to get started
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="form-label">
                {userType === 'builder' ? 'Contact Person Name' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-luxury pl-11 ${errors.name ? 'border-red-500 ring-red-500' : ''}`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            {/* Company Name (Builder only) */}
            {userType === 'builder' && (
              <div>
                <label htmlFor="companyName" className="form-label">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`input-luxury pl-11 ${errors.companyName ? 'border-red-500 ring-red-500' : ''}`}
                    placeholder="Enter company name"
                  />
                </div>
                {errors.companyName && <p className="form-error">{errors.companyName}</p>}
              </div>
            )}

            {/* Experience (Builder only) */}
            {userType === 'builder' && (
              <div>
                <label htmlFor="experience" className="form-label">
                  Years of Experience
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`select-luxury ${errors.experience ? 'border-red-500 ring-red-500' : ''}`}
                >
                  <option value="">Select experience</option>
                  <option value="1-3">1-3 years</option>
                  <option value="4-7">4-7 years</option>
                  <option value="8-15">8-15 years</option>
                  <option value="15+">15+ years</option>
                </select>
                {errors.experience && <p className="form-error">{errors.experience}</p>}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-luxury pl-11 ${errors.email ? 'border-red-500 ring-red-500' : ''}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input-luxury pl-11 ${errors.phone ? 'border-red-500 ring-red-500' : ''}`}
                  placeholder="Enter 10-digit phone number"
                />
              </div>
              {errors.phone && <p className="form-error">{errors.phone}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-luxury pl-11 pr-11 ${errors.password ? 'border-red-500 ring-red-500' : ''}`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input-luxury pl-11 pr-11 ${errors.confirmPassword ? 'border-red-500 ring-red-500' : ''}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div>
            <div className="flex items-start">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={`h-4 w-4 text-gold-500 focus:ring-gold-500 border-dark-600 bg-dark-800 rounded mt-1 ${errors.agreeToTerms ? 'border-red-500' : ''}`}
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-gold-400 hover:text-gold-300">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-gold-400 hover:text-gold-300">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && <p className="form-error">{errors.agreeToTerms}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-gold-400 hover:text-gold-300 font-semibold transition-colors duration-200">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;