import { create } from 'zustand'

export const useThemeStore = create((set, get) => ({
  isDark: false,

  // Toggle theme
  toggleTheme: () => {
    const newIsDark = !get().isDark
    set({ isDark: newIsDark })
    
    // Update document class
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  },

  // Initialize theme from localStorage
  initializeTheme: () => {
    const savedTheme = localStorage.getItem('theme')
    const isDark = savedTheme === 'dark'
    
    set({ isDark })
    
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
}))
