import type { TRegister, TRegisterResponse } from '@/types/users'
import { useMutation } from '@tanstack/react-query'
import { authSignup } from '../services/auth'
import { toast } from 'sonner' // if you're using the same toast library

export const useauthRegister = () => {
  return useMutation<TRegisterResponse, Error, TRegister>({
    mutationKey: ['register'],
    mutationFn: authSignup,
    onSuccess: (data) => {
      console.log('Registration successful:', data)
      toast.success(data.message || 'Registration successful!')
    },
    onError: (error: any) => {
      console.error('Registration failed:', error)
      let errorMessage = 'Registration failed. Please try again.'

      if (error?.response?.message) {
        // Handle array of validation messages
        if (Array.isArray(error.response.message)) {
          errorMessage = error.response.message.join(', ')
        } else {
          errorMessage = error.response.message
        }
      } else if (error?.message) {
        errorMessage = error.message
      }

      toast.error(errorMessage)
    },
  })
}
