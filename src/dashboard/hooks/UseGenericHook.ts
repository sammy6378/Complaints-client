
import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query'
import {
  fetchList,
  fetchOne,
  createItem,
  updateItem,
  deleteItem,
} from '../services/genericApi'
  
import type { ApiResponse } from '../services/genericApi'

//   Fetch a list of items
export const useGetList = <T>(
  key: string,
  url: string,
): UseQueryResult<ApiResponse<T[]>, Error> => {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetchList<T>(url),
    // staleTime: 1000,
  })
}

/**
 * Fetch a single item by ID
 */
export const useGetOne = <T>(
  key: string,
  url: string,
  enabled: boolean = true,
): UseQueryResult<ApiResponse<T>, Error> => {
  return useQuery({
    queryKey: [key, url],
    queryFn: () => fetchOne<T>(url),
    enabled,
    // staleTime: 1000,
  })
}

/**
 * Create a new item
 */
export const useCreate = <T, D = Partial<T>>(
  key: string,
  url: string,
): UseMutationResult<ApiResponse<T>, Error, D> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: D) => createItem<T, D>(url, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key], exact: true })
    },
  })
}

/**
 * Update an item by ID
 */
export const useUpdate = <T, D = Partial<T>>(
  key: string,
  urlFn: (id: string) => string,
): UseMutationResult<ApiResponse<T>, Error, { id: string; data: D }> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => updateItem<T, D>(urlFn(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key], exact: true })
    },
  })
}

/**
 * Delete an item by ID
 */
export const useDelete = (
  key: string,
  urlFn: (id: string) => string,
): UseMutationResult<ApiResponse<null>, Error, string> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteItem(urlFn(id)),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [key],exact: true })
      // // remove from cached list
      // queryClient.setQueryData<ApiResponse<any[]>>([key], (oldData) => {
      //   if (!oldData) return oldData
      //   return {
      //     ...oldData,
      //     data: oldData.data.filter((item) => item.category_id !== id),
      //   }
      // })
    },
    onError: (error: Error) => {
      console.error('Delete mutation error:', error)
    },
  })
}
