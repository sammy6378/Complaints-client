export type TApiResponse = {
  data: {
    data: TComplaint[]
  }
  total: number
  limit: number
}
export interface TComplaint extends TApiResponse {
  complaint_id: string
  complaint_title: string
  complaint_description: string
  complaint_status: string
  priority: string
  location: string
}

export enum TPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical',
}

export interface TCreateComplaint {
  complaint_title: string
  complaint_description: string
  priority: TPriority
  location: string
}