// hooks/useFeedback.ts

import { useGetList, useGetOne, useCreate } from './UseGenericHook'

import type { TFeedback, TCreateFeedback } from '@/types/feedbacks'

const base = 'feedbacks'

export const usegetFeedbacks = () => useGetList<TFeedback>('feedbacks', base)

export const usegetFeedback = (id: string) =>
  useGetOne<TFeedback>('feedback', `${base}/${id}`, !!id)

export const useCreateFeedback = () =>
  useCreate<TFeedback, TCreateFeedback>('feedbacks', base)
