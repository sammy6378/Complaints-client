export interface TComplaint {
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
  category_id: string
  sub_categories?: string[]
}
