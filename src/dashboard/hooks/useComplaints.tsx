import {
  useGetOne,
  useCreate,
  useUpdate,
  useDelete,
  useGetList,
} from './UseGenericHook'

import type { TCreateComplaint, TComplaint } from '@/types/complaints'

const base = 'complaints'

// Custom hook for paginated complaints
export const usegetCompaints = () => 
  useGetList<TComplaint>(
    'complaints',
    base,
  )

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

export const useComplaintMetrics = () => {
  const {data: complaints} = usegetCompaints()
  const complaintsData = complaints?.data || []

  // Ensure we have an array before filtering
  const dataArray = Array.isArray(complaintsData) ? complaintsData : []

  const total = dataArray.length || 0
  const resolved =
    dataArray.filter((c) => c.complaint_status === 'Resolved').length || 0
  const pending =
    dataArray.filter((c) => c.complaint_status === 'Pending').length || 0
  const rejected =
    dataArray.filter((c) => c.complaint_status === 'Rejected').length || 0
  const highPriority =
    dataArray.filter((c) => c.priority === 'High').length || 0
  const criticalPriority =
    dataArray.filter((c) => c.priority === 'Critical').length || 0
  const mediumPriority =
    dataArray.filter((c) => c.priority === 'Medium').length || 0
  const lowPriority = dataArray.filter((c) => c.priority === 'Low').length || 0

  return {
    total,
    resolved,
    pending,
    rejected,
    highPriority,
    criticalPriority,
    mediumPriority,
    lowPriority
  }
}
