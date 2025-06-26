// hooks/useMessages.ts

import {
    useGetList,
    useGetOne,
    useCreate,
    useUpdate,
    useDelete,
  } from './UseGenericHook'
  
  import type { TMessage, TCreateMessage, TCreateReply } from '@/types/notifications'
  import {
    createReply,
    getNotificationById,
    getNotifications,
    updateNotification,
  } from '../services/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
  
  const base = 'notifications'
  
  export const usegetALLMessages = () =>
    useGetList<TMessage>('messages', base)
  
  export const usegetMessageById = (id: string) =>
    useGetOne<TMessage>('message', `${base}/${id}`, !!id)
  
  export const useCreateMessage = () =>
    useCreate<TMessage, TCreateMessage>('messages', base)
  
  export const useUpdateMessage = () =>
    useUpdate<TMessage, Partial<TCreateMessage>>('messages', (id) => `${base}/${id}`)
  
  export const useDeleteMessage = () =>
    useDelete('messages', (id) => `${base}/${id}`)
  
  // hooks/useMessages.ts (continued)

export const useGetUnreadMessages = () =>
    useQuery({
      queryKey: ['unreadMessages'],
      queryFn: async () => {
        const messages = await getNotifications()
        return messages.filter((message) => !message.is_read)
      },
    })
  
  export const useMarkMessageAsRead = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['markMessageAsRead'],
      mutationFn: async (id: string) => {
        const message = await getNotificationById(id)
        return updateNotification(id, { ...message, is_read: true })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['messages'] })
      },
    })
  }
  
  export const useMarkAllMessagesAsRead = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['markAllMessagesAsRead'],
      mutationFn: async () => {
        const messages = await getNotifications()
        const updatePromises = messages.map((message) =>
          updateNotification(message.id, { ...message, is_read: true }),
        )
        await Promise.all(updatePromises)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['messages'] })
      },
    })
  }
  
  export const useCreateReplies = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: ['createReply'],
      mutationFn: ({ notificationId, reply }: { notificationId: string; reply: TCreateReply }) =>
        createReply(notificationId, reply),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['messages'] })
      },
    })
  }
  