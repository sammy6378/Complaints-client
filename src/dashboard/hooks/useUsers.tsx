// hooks/useUsers.ts

import { useGetList, useGetOne, useCreate } from './UseGenericHook'

import type { TUser, TCreateUser } from '@/types/users'

const base = 'users'

export const usegetUsers = () => useGetList<TUser>('users', base)

export const usegetUserById = (id: string) =>
  useGetOne<TUser>('user', `${base}/${id}`, !!id)

export const useCreateUser = () => useCreate<TUser, TCreateUser>('users', base)
