import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { MessageCircle, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Validation schemas
  const signInSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  })

  type formData = z.infer<typeof signInSchema>

  const validateField = <T,>(value: T, schema: z.ZodType<T>) => {
    const result = schema.safeParse(value)
    if (!result.success) {
      return result.error.issues[0]?.message || 'Validation error'
    }
    return undefined
  }

  const { Field, handleSubmit, reset, Subscribe } = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as formData,
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      const validate = signInSchema.safeParse(value)
      if (!validate.success) {
        console.error('Validation failed:', validate.error.issues)
        return
      }
      toast.success('Form submitted successfully!')

      // Reset form after successful submission
      reset()
      setIsLoading(false)
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-start justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">ResolveIt</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-300">Sign in to your account to continue</p>
        </div>

        {/* Sign In Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit()
          }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-6 w-full"
        >
          {/* Email Field */}
          <Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                validateField(value, signInSchema.shape.email),
              onBlur: ({ value }) =>
                validateField(value, signInSchema.shape.email),
            }}
          >
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
                {field.state.meta.errors.length > 0 && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {String(field.state.meta.errors[0])}
                  </div>
                )}
              </div>
            )}
          </Field>

          {/* Password Field */}
          <Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                validateField(value, signInSchema.shape.password),
              onBlur: ({ value }) =>
                validateField(value, signInSchema.shape.password),
            }}
          >
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {field.state.meta.errors.length > 0 && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {String(field.state.meta.errors[0])}
                  </div>
                )}
              </div>
            )}
          </Field>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
            >
              Forgot your password?
            </button>
          </div>

          {/* Submit Button */}
          <Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={isLoading || !canSubmit}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            )}
          />

          {/* Switch to Sign Up */}
          <div className="text-center pt-4 border-t border-white/10">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link
                to="/Signup"
                className="text-purple-400 cursor-pointer hover:text-purple-300 font-semibold transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
