// Mock authentication service
// In production, replace with actual API calls

const DEMO_USERS = [
    {
      id: 'builder_001',
      name: 'Demo Builder',
      email: 'demo.builder@luxerealty.com',
      password: 'builder123',
      userType: 'builder',
      phone: '9876543210',
      companyName: 'Premium Builders Ltd',
      experience: '8-15',
      verified: true,
      joinedDate: '2023-01-15',
      totalProperties: 12,
      activeProjects: 8
    },
    {
      id: 'customer_001',
      name: 'Demo Customer',
      email: 'demo.customer@luxerealty.com',
      password: 'customer123',
      userType: 'customer',
      phone: '9876543211',
      verified: true,
      joinedDate: '2023-06-20',
      totalInvestments: 2,
      portfolioValue: 700000
    }
  ];
  
  export const authService = {
    // Login user
    login: async (email, password) => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        const user = DEMO_USERS.find(u => u.email === email && u.password === password);
        
        if (!user) {
          return {
            success: false,
            message: 'Invalid email or password'
          };
        }
  
        // Generate mock token
        const token = `mock_token_${user.id}_${Date.now()}`;
        
        // Remove password from user object
        const { password: _, ...userWithoutPassword } = user;
        
        return {
          success: true,
          user: userWithoutPassword,
          token,
          message: 'Login successful'
        };
      } catch (error) {
        console.error('Login error:', error);
        return {
          success: false,
          message: 'Login failed. Please try again.'
        };
      }
    },
  
    // Register new user
    register: async (userData) => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
  
        // Check if email already exists
        const existingUser = DEMO_USERS.find(u => u.email === userData.email);
        if (existingUser) {
          return {
            success: false,
            message: 'Email already registered'
          };
        }
  
        // Create new user
        const newUser = {
          id: `${userData.userType}_${Date.now()}`,
          name: userData.name,
          email: userData.email,
          userType: userData.userType,
          phone: userData.phone,
          verified: false,
          joinedDate: new Date().toISOString().split('T')[0],
          ...(userData.userType === 'builder' ? {
            companyName: userData.companyName,
            experience: userData.experience,
            totalProperties: 0,
            activeProjects: 0
          } : {
            totalInvestments: 0,
            portfolioValue: 0
          })
        };
  
        // Add to demo users (in production, this would be saved to database)
        DEMO_USERS.push(newUser);
  
        // Generate mock token
        const token = `mock_token_${newUser.id}_${Date.now()}`;
        
        return {
          success: true,
          user: newUser,
          token,
          message: 'Registration successful'
        };
      } catch (error) {
        console.error('Registration error:', error);
        return {
          success: false,
          message: 'Registration failed. Please try again.'
        };
      }
    },
  
    // Get current user
    getCurrentUser: async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
  
        // Extract user ID from mock token
        const userId = token.split('_')[2];
        const user = DEMO_USERS.find(u => u.id === userId);
        
        if (!user) {
          throw new Error('User not found');
        }
  
        // Remove password from user object
        const { password: _, ...userWithoutPassword } = user;
        
        return userWithoutPassword;
      } catch (error) {
        console.error('Get current user error:', error);
        throw error;
      }
    },
  
    // Update user profile
    updateProfile: async (userId, updateData) => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        const userIndex = DEMO_USERS.findIndex(u => u.id === userId);
        if (userIndex === -1) {
          return {
            success: false,
            message: 'User not found'
          };
        }
  
        // Update user data
        DEMO_USERS[userIndex] = {
          ...DEMO_USERS[userIndex],
          ...updateData
        };
  
        // Remove password from response
        const { password: _, ...updatedUser } = DEMO_USERS[userIndex];
  
        return {
          success: true,
          user: updatedUser,
          message: 'Profile updated successfully'
        };
      } catch (error) {
        console.error('Update profile error:', error);
        return {
          success: false,
          message: 'Profile update failed'
        };
      }
    },
  
    // Change password
    changePassword: async (userId, currentPassword, newPassword) => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        const user = DEMO_USERS.find(u => u.id === userId);
        if (!user) {
          return {
            success: false,
            message: 'User not found'
          };
        }
  
        if (user.password !== currentPassword) {
          return {
            success: false,
            message: 'Current password is incorrect'
          };
        }
  
        // Update password
        user.password = newPassword;
  
        return {
          success: true,
          message: 'Password updated successfully'
        };
      } catch (error) {
        console.error('Change password error:', error);
        return {
          success: false,
          message: 'Password change failed'
        };
      }
    },
  
    // Forgot password
    forgotPassword: async (email) => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        const user = DEMO_USERS.find(u => u.email === email);
        if (!user) {
          return {
            success: false,
            message: 'Email not found'
          };
        }
  
        // In production, this would send an email with reset link
        return {
          success: true,
          message: 'Password reset link sent to your email'
        };
      } catch (error) {
        console.error('Forgot password error:', error);
        return {
          success: false,
          message: 'Failed to send reset link'
        };
      }
    },
  
    // Verify email
    verifyEmail: async (userId, verificationCode) => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        const user = DEMO_USERS.find(u => u.id === userId);
        if (!user) {
          return {
            success: false,
            message: 'User not found'
          };
        }
  
        // Mock verification (in production, validate the code)
        user.verified = true;
  
        return {
          success: true,
          message: 'Email verified successfully'
        };
      } catch (error) {
        console.error('Email verification error:', error);
        return {
          success: false,
          message: 'Email verification failed'
        };
      }
    }
  };