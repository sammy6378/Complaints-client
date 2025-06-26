// types/history.ts

export type TId = {
  id: string
}

export interface THistory extends TId {
  from_status: string
  to_status: string
  remarks: string
  created_at: Date
  updated_at: Date
}

export interface TCreateHistory {
  from_status: string
  to_status: string
  remarks: string
}
