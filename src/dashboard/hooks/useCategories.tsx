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
  useGetOne<TCategory>('categories', `${base}/${id}`, !!id)

export const usecreateCategory = () =>
  useCreate<TCategory, TCreateCategory>('createcategory', base)

export const useupdateCategory = () =>
  useUpdate<TCategory, Partial<TCreateCategory>>(
    'updatecategory',
    (id) => `${base}/${id}`,
  )

export const usedeleteCategory = () =>
  useDelete('deletecategory', (id) => `${base}/${id}`)


export const useGetCategoryMetrics = () =>{
  const {data: category} = usegetCategories();

  const total = category?.data.length || 0;

  return {
    total
  }
}