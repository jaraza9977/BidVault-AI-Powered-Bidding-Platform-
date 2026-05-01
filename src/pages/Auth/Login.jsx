import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { authService } from '../../services/authService'
import { useAuthStore } from '../../store/authStore'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { useCountdown } from '../../hooks/useCountdown'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotStep, setForgotStep] = useState('email') // 'email' | 'otp'
  const [forgotEmail, setForgotEmail] = useState('')
  const [otp, setOtp] = useState('')
  
  const navigate = useNavigate()
  const { login, incrementLoginAttempts, loginAttempts, cooldownUntil, resetLoginAttempts } = useAuthStore()
  
  const cooldownRemaining = useCountdown(cooldownUntil)
  const isInCooldown = cooldownRemaining > 0

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    if (isInCooldown) {
      toast.error(`Too many attempts. Try again in ${Math.ceil(cooldownRemaining)} seconds`)
      return
    }

    setIsLoading(true)
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      })
      
      login(response.data.user, response.data.token)
      resetLoginAttempts()
      toast.success('Welcome back!')
      
      // Redirect based on role
      if (response.data.user.role === 'seller') {
        navigate('/dashboard') // Placeholder for seller dashboard
      } else {
        navigate('/')
      }
    } catch (error) {
      incrementLoginAttempts()
      const attemptsLeft = 3 - (loginAttempts + 1)
      
      if (attemptsLeft > 0) {
        toast.error(`${error.response?.data?.message || 'Login failed'}. ${attemptsLeft} attempts remaining.`)
      } else {
        toast.error('Too many failed attempts. Please wait 30 seconds.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const response = await authService.googleAuth()
      login(response.data.user, response.data.token)
      toast.success('Logged in with Google!')
      navigate('/')
    } catch (error) {
      toast.error('Google login failed')
    }
  }

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      toast.error('Please enter your email')
      return
    }

    try {
      await authService.forgotPassword(forgotEmail)
      toast.success('OTP sent to your email')
      setForgotStep('otp')
    } catch (error) {
      toast.error('Failed to send OTP')
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }

    try {
      await authService.verifyOTP(forgotEmail, otp)
      toast.success('OTP verified! You can now reset your password.')
      setShowForgotModal(false)
      setForgotStep('email')
      setForgotEmail('')
      setOtp('')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 opacity-10 dark:opacity-20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-soft-lg p-8 border border-white/20 dark:border-slate-800/50">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Login to continue shopping
            </p>
          </div>

          {/* Cooldown Warning */}
          {isInCooldown && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-sm text-red-600 dark:text-red-400 text-center">
                Too many failed attempts. Try again in{' '}
                <span className="font-bold">
                  {cooldownRemaining} seconds
                </span>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              error={errors.email?.message}
              {...register('email')}
            />

            {/* Password */}
            <div>
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-500 border-slate-300 rounded focus:ring-primary-500"
                  {...register('rememberMe')}
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-sm text-primary-500 hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
              disabled={isInCooldown}
            >
              Login
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/80 dark:bg-slate-900/80 text-slate-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-2.5 border-2 border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Login with Google
            </button>

            {/* Signup Link */}
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-500 hover:underline font-medium">
                Sign up
              </Link>
            </p>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
              <p className="text-xs text-primary-700 dark:text-primary-300 text-center font-medium mb-2">
                Demo Credentials
              </p>
              <p className="text-xs text-primary-600 dark:text-primary-400 text-center">
                Email: test@example.com<br />
                Password: Test@123
              </p>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotModal}
        onClose={() => {
          setShowForgotModal(false)
          setForgotStep('email')
          setForgotEmail('')
          setOtp('')
        }}
        title="Reset Password"
      >
        {forgotStep === 'email' ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Enter your email address and we'll send you an OTP to reset your password.
            </p>
            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            <Button onClick={handleForgotPassword} className="w-full">
              Send OTP
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Enter the 6-digit OTP sent to {forgotEmail}
            </p>
            <Input
              label="OTP"
              type="text"
              placeholder="123456"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            />
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setForgotStep('email')}
                className="flex-1"
              >
                Back
              </Button>
              <Button onClick={handleVerifyOTP} className="flex-1">
                Verify OTP
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Login
