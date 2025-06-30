import handleApiResponse from '@/lib/ApiResponse'
import { baseUrl } from './genericApi'
import type { TCreateReply, TMessage, TReply } from '@/types/notifications'

const url = `${baseUrl}/notifications`

// Get all notifications
export const getNotifications = async (): Promise<TMessage[]> => {
  const res = await fetch(url)
  await handleApiResponse(res)
  return res.json()
}

// Get notification by id
export const getNotificationById = async (id: string): Promise<TMessage> => {
  const res = await fetch(`${url}/${id}`)
  await handleApiResponse(res)
  return res.json()
}

// Create a new notification
export const createNotification = async (
  notification: TMessage,
): Promise<TMessage> => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notification),
  })
  await handleApiResponse(res)
  return res.json()
}

// Update an existing notification
export const updateNotification = async (
  id: string,
  notification: Partial<TMessage>,
): Promise<TMessage> => {
  const res = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notification),
  })
  await handleApiResponse(res)
  return res.json()
}

// Delete a notification
export const deleteNotification = async (id: string): Promise<void> => {
  const res = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  })
  await handleApiResponse(res)
}


// create a reply to a notification
export const createReply = async (
  notificationId: string,
  reply: TCreateReply,
): Promise<TReply> => {
  const res = await fetch(`${url}/${notificationId}/replies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reply),
  })
  await handleApiResponse(res)
  return res.json()
}



