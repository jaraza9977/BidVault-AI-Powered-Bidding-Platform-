import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import AppRoutes from './routes/AppRoutes'

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  useEffect(() => {
    // Initialize auth from localStorage on app mount
    initializeAuth()
  }, [initializeAuth])

  return <AppRoutes />
}

export default App
