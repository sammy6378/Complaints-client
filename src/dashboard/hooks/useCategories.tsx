// hooks/useCategories.ts

import {
  useGetList,
  useGetOne,
  useCreate,
  useUpdate,
  useDelete,
} from './UseGenericHook'
import type { TCategory, TCreateCategory } from '@/types/categories'

const base = 'categories'

export const usegetCategories = () => useGetList<TCategory>('categories', base)

export const usegetCategory = (id: string) =>
  useGetOne<TCategory>('category', `${base}/${id}`, !!id)

export const usecreateCategory = () =>
  useCreate<TCategory, TCreateCategory>('categories', base)

export const useupdateCategory = () =>
  useUpdate<TCategory, Partial<TCreateCategory>>(
    'categories',
    (id) => `${base}/${id}`,
  )

export const usedeleteCategory = () =>
  useDelete('categories', (id) => `${base}/${id}`)
