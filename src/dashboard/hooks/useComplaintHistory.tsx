// hooks/useHistory.ts

import { useGetList, useGetOne, useCreate } from './UseGenericHook'

import type { THistory, TCreateHistory } from '@/types/complaintHistory'

const base = 'complaint-history'

export const usegetComplaintHistory = () =>
  useGetList<THistory>('complaint-history', base)

export const usegetComplaintHistoryById = (id: string) =>
  useGetOne<THistory>('complaint-history-detail', `${base}/${id}`, !!id)

export const usecreateComplaintHistory = () =>
  useCreate<THistory, TCreateHistory>('complaint-history', base)
