// types/message.ts

export enum Type {
  SYSTEM = 'system',
  COMPLAINT = 'complaint',
  FEEDBACK = 'feedback',
  WARNING = 'warning',
  ALERT = 'alert',
}

export interface TReply {
  id: string
  message: string
  created_at: Date
}

export interface TMessage {
  id: string
  title: string
  message: string
  type: Type
  is_read: boolean
  created_at: Date
  replies?: TReply[]
}

export type TCreateMessage = Omit<TMessage, 'id' | 'created_at' | 'replies'>
export type TCreateReply = Omit<TReply, 'id' | 'created_at'>
