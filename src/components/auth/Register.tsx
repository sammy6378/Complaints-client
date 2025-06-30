import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { MessageCircle, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useauthRegister } from '@/dashboard/hooks/useRegisterHook'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const registerUser = useauthRegister()
  const navigate = useNavigate()

  const signUpSchema = z.object({
    full_name: z.string().min(2, 'Full name must be at least 2 characters'),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores',
      ),
    phone_number: z
      .string()
      .min(10, 'Phone number must be at least 10 digits')
      .regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain upper, lower, and number',
      ),
  })

  type FormData = z.infer<typeof signUpSchema>

  const validateField = <T,>(value: T, schema: z.ZodType<T>) => {
    const result = schema.safeParse(value)
    if (!result.success) {
      return result.error.issues[0]?.message || 'Validation error'
    }
    return undefined
  }

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: {
      full_name: '',
      username: '',
      phone_number: '',
      email: '',
      password: '',
    } as FormData,
    onSubmit: async ({ value }) => {
      setIsLoading(true)

      const validate = signUpSchema.safeParse(value)
      if (!validate.success) {
        console.error('Validation failed:', validate.error.issues)
        return
      }
     try {
      await registerUser.mutateAsync(value)
      toast.success('Account created successfully!')
      setIsLoading(false)
      // redirect to login
      navigate({ to: '/Signin', replace: true })   
     } catch (error) {
        console.error('Error during registration:', error)
      }finally{
        setIsLoading(false)
      }
      
     }
    },
  )

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

          <h1 className="text-3xl font-bold text-white mb-2">
            Create your account
          </h1>
          <p className="text-gray-300">
            Join thousands of users who trust ResolveIt
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit()
          }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-6 w-full"
        >
          {/* Full Name */}
          <Field
            name="full_name"
            validators={{
              onChange: ({ value }) =>
                validateField(value, signUpSchema.shape.full_name),
              onBlur: ({ value }) =>
                validateField(value, signUpSchema.shape.full_name),
            }}
          >
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {field.state.meta.errors[0] && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {field.state.meta.errors[0]}
                  </div>
                )}
              </div>
            )}
          </Field>

          {/* Username */}
          <Field
            name="username"
            validators={{
              onChange: ({ value }) =>
                validateField(value, signUpSchema.shape.username),
              onBlur: ({ value }) =>
                validateField(value, signUpSchema.shape.username),
            }}
          >
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {field.state.meta.errors[0] && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {field.state.meta.errors[0]}
                  </div>
                )}
              </div>
            )}
          </Field>

          {/* Phone Number */}
          <Field
            name="phone_number"
            validators={{
              onChange: ({ value }) =>
                validateField(value, signUpSchema.shape.phone_number),
              onBlur: ({ value }) =>
                validateField(value, signUpSchema.shape.phone_number),
            }}
          >
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {field.state.meta.errors[0] && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {field.state.meta.errors[0]}
                  </div>
                )}
              </div>
            )}
          </Field>

          {/* Email */}
          <Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                validateField(value, signUpSchema.shape.email),
              onBlur: ({ value }) =>
                validateField(value, signUpSchema.shape.email),
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
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {field.state.meta.errors[0] && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {field.state.meta.errors[0]}
                  </div>
                )}
              </div>
            )}
          </Field>

          {/* Password */}
          <Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                validateField(value, signUpSchema.shape.password),
              onBlur: ({ value }) =>
                validateField(value, signUpSchema.shape.password),
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
                    placeholder="Create a password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
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
                {field.state.meta.errors[0] && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {field.state.meta.errors[0]}
                  </div>
                )}
              </div>
            )}
          </Field>

          {/* Submit */}
          <Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit]) => (
              <button
                type="submit"
                disabled={isLoading || !canSubmit}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            )}
          />

          {/* Switch to Sign In */}
          <div className="text-center pt-4 border-t border-white/10">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link
                to="/Signin"
                className="text-purple-400 cursor-pointer hover:text-purple-300 font-semibold transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
