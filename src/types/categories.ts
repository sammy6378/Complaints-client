// types/categories.ts

export type TId = {
  category_id: string
}

export interface TCategory extends TId {
  category_name: string
  description: string
}

export interface TCategoriesResponse {
  success: boolean
  message: string
  data: TCategory[]
}

export interface TCreateCategory {
  category_name: string
  description: string
}
