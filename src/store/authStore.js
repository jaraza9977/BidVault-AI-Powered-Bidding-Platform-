import { create } from 'zustand'
import { TOKEN_KEY, USER_KEY } from '../utils/constants'

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loginAttempts: 0,
  cooldownUntil: null,

  // Initialize auth from localStorage
  initializeAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY)
    const userStr = localStorage.getItem(USER_KEY)
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        set({ user, token, isAuthenticated: true })
      } catch (error) {
        console.error('Failed to parse user data:', error)
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
      }
    }
  },

  // Login action
  login: (userData, token) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
    set({ 
      user: userData, 
      token, 
      isAuthenticated: true,
      loginAttempts: 0,
      cooldownUntil: null,
    })
  },

  // Logout action
  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    set({ 
      user: null, 
      token: null, 
      isAuthenticated: false,
      loginAttempts: 0,
      cooldownUntil: null,
    })
  },

  // Increment login attempts
  incrementLoginAttempts: () => {
    set((state) => {
      const newAttempts = state.loginAttempts + 1
      
      // After 3 failed attempts, set 30-second cooldown
      if (newAttempts >= 3) {
        const cooldownUntil = Date.now() + 30 * 1000 // 30 seconds
        return { 
          loginAttempts: newAttempts,
          cooldownUntil,
        }
      }
      
      return { loginAttempts: newAttempts }
    })
  },

  // Reset login attempts
  resetLoginAttempts: () => {
    set({ loginAttempts: 0, cooldownUntil: null })
  },

  // Check if in cooldown
  isInCooldown: () => {
    const state = useAuthStore.getState()
    if (!state.cooldownUntil) return false
    return Date.now() < state.cooldownUntil
  },

  // Update user profile
  updateUser: (userData) => {
    set((state) => {
      const updatedUser = { ...state.user, ...userData }
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))
      return { user: updatedUser }
    })
  },
}))
