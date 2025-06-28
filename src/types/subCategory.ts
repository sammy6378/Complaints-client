
export type TId = {
  id: string
}

export interface TSub extends TId {
  subcategory_name: string
  description: string
}

export interface TCreateSub {
  category_id: string
  subcategory_name: string
  description: string
}
