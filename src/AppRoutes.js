import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserTypeSelection from './components/auth/UserTypeSelection';
import BuilderDashboard from './components/dashboard/builder/BuilderDashboard';
import CustomerDashboard from './components/dashboard/customer/CustomerDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const AppRoutes = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-type" element={<UserTypeSelection />} />
          
          {/* Protected Dashboard Routes */}
          <Route 
            path="/builder/dashboard/*" 
            element={
              <ProtectedRoute userType="builder">
                <BuilderDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer/dashboard/*" 
            element={
              <ProtectedRoute userType="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;