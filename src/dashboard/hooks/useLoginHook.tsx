import {
  authSlice,
  type TLoginRequest,
} from '@/store/store'
import { toast } from 'sonner'
import { authLogin, type TLoginResponse } from '../services/auth'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
  return useMutation<TLoginResponse, Error, TLoginRequest>({
    mutationKey: ['login'],
    mutationFn: authLogin,
    onSuccess: (data) => {
      authSlice.login(data.data)
      toast.success('Successfully signed in!')
    },
    onError: (error:any) => {
      console.error('Sign in failed:', error)
      let errorMessage = 'Sign in failed. Please try again.'
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
