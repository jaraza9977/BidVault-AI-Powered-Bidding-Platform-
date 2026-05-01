import api from './api'

// Mock authentication service
export const authService = {
  // Login with mock data
  login: async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check credentials
        if (
          credentials.email === 'test@example.com' &&
          credentials.password === 'Test@123'
        ) {
          resolve({
            data: {
              user: {
                id: 1,
                fullName: 'Test User',
                email: 'test@example.com',
                role: 'buyer',
                profilePicture: null,
              },
              token: 'mock-jwt-token-12345',
            },
          })
        } else {
          reject({
            response: {
              data: {
                message: 'Invalid email or password',
              },
            },
          })
        }
      }, 500)
    })
  },

  // Signup with mock data
  signup: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            message: 'Account created successfully',
            user: {
              id: Date.now(),
              ...userData,
            },
          },
        })
      }, 500)
    })
  },

  // Google OAuth mock
  googleAuth: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: 2,
              fullName: 'Google User',
              email: 'google@example.com',
              role: 'buyer',
              profilePicture: 'https://via.placeholder.com/150',
            },
            token: 'mock-google-jwt-token',
          },
        })
      }, 500)
    })
  },

  // Forgot password mock
  forgotPassword: async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            message: 'OTP sent to your email',
          },
        })
      }, 500)
    })
  },

  // Verify OTP mock
  verifyOTP: async (email, otp) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === '123456') {
          resolve({
            data: {
              message: 'OTP verified successfully',
            },
          })
        } else {
          reject({
            response: {
              data: {
                message: 'Invalid OTP',
              },
            },
          })
        }
      }, 500)
    })
  },
}
