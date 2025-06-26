
import {
  useGetList,
  useGetOne,
  useCreate,
  useUpdate,
  useDelete,
} from './UseGenericHook'

import type { TCreateComplaint, TComplaint } from '@/types/complaints'

const base = 'complaints'

export const usegetCompaints = () =>
  useGetList<TComplaint>('complaints', `${base}?limit=50`)

export const usegetComplaint = (id: string) =>
  useGetOne<TComplaint>('complaint', `${base}/${id}`, !!id)

export const usecreateComplaint = () =>
  useCreate<TComplaint, TCreateComplaint>('complaints', base)

export const useupdateComplaint = () =>
  useUpdate<TComplaint, Partial<TCreateComplaint>>(
    'complaints',
    (id) => `${base}/${id}`,
  )

export const usedeleteComplaint = () =>
  useDelete('complaints', (id) => `${base}/${id}`)
