// types/user.ts

export interface TUser {
  full_name: string
  username: string
  email: string
  phone_number: string
  password: string
}

// If needed, create a separate type for registration (optional)
export type TCreateUser = Omit<TUser, 'password'> & { password: string }
