import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Crown, Mail, Lock, ArrowRight } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      const user = result.user;
      if (user.userType === 'builder') {
        navigate('/builder/dashboard');
      } else if (user.userType === 'customer') {
        navigate('/customer/dashboard');
      } else {
        navigate(from);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Demo credentials for testing
  const demoCredentials = [
    { type: 'Builder', email: 'demo.builder@luxerealty.com', password: 'builder123' },
    { type: 'Customer', email: 'demo.customer@luxerealty.com', password: 'customer123' }
  ];

  const fillDemoCredentials = (email, password) => {
    setFormData({ email, password });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dark-950">
      <div className="max-w-md w-full space-y-8">
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
            Welcome Back
          </h2>
          <p className="text-gray-400">
            Sign in to access your account
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-dark-900 border border-dark-700 rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Demo Credentials:</h3>
          <div className="space-y-2">
            {demoCredentials.map((demo, index) => (
              <button
                key={index}
                onClick={() => fillDemoCredentials(demo.email, demo.password)}
                className="w-full text-left p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors duration-200 text-sm"
              >
                <div className="font-medium text-gold-400">{demo.type}</div>
                <div className="text-gray-400 text-xs">{demo.email}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
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
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-luxury pl-11 ${errors.email ? 'border-red-500 ring-red-500' : ''}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="form-error">{errors.email}</p>}
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
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-luxury pl-11 pr-11 ${errors.password ? 'border-red-500 ring-red-500' : ''}`}
                  placeholder="Enter your password"
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
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-gold-500 focus:ring-gold-500 border-dark-600 bg-dark-800 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="text-gold-400 hover:text-gold-300 transition-colors duration-200">
                Forgot your password?
              </Link>
            </div>
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
                  <span>Sign In</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-gold-400 hover:text-gold-300 font-semibold transition-colors duration-200">
                Sign up here
              </Link>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-gold-400 hover:text-gold-300">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-gold-400 hover:text-gold-300">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;