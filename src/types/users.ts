// types/user.ts

export interface TRegister {
  full_name: string
  username: string
  email: string
  phone_number: string
  password: string
}

export interface TRegisterResponse{
  success: boolean
  message: string
  data: {
    user_id: string
    full_name: string
    username: string
    email: string
    phone_number: string
    role: string
  }
}

// If needed, create a separate type for registration (optional)
export type TCreateUser = Omit<TRegister, 'password'> & { password: string }
