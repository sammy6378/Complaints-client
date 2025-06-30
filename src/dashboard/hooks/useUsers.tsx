// hooks/useUsers.ts

import { useGetList, useGetOne, useCreate } from './UseGenericHook'

import type { TRegister, TCreateUser } from '@/types/users'

const base = 'users'

export const usegetUsers = () => useGetList<TRegister>('users', base)

export const usegetUserById = (id: string) =>
  useGetOne<TRegister>('user', `${base}/${id}`, !!id)

export const useCreateUser = () => useCreate<TRegister, TCreateUser>('users', base)
