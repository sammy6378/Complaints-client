
import {
  useGetList,
  useGetOne,
  useCreate,
  useUpdate,
  useDelete,
} from './UseGenericHook'

import type { TSub, TCreateSub } from '@/types/subCategory'

const base = 'subcategories'

export const usegetSubCategories = () => useGetList<TSub>('subcategories', base)

export const usegetSubCategory = (id: string) =>
  useGetOne<TSub>('subcategory', `${base}/${id}`, !!id)

export const useCreateSubCategory = () =>
  useCreate<TSub, TCreateSub>('subcategories', base)

export const useUpdateSubCategory = () =>
  useUpdate<TSub, Partial<TCreateSub>>('subcategories', (id) => `${base}/${id}`)

export const useDeleteSubCategory = () =>
  useDelete('subcategories', (id) => `${base}/${id}`)
