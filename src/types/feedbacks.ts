// types/feedback.ts

export type TId = {
  id: string
}

export interface TFeedback extends TId {
  message: string
  rating: number
}

export type TCreateFeedback = Omit<TFeedback, 'id'>
