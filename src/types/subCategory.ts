
export type TId = {
  id: string
}

export interface TSub extends TId {
  subcategory_name: string
  description: string
}

export interface TCreateSub {
  subcategory_name: string
  description: string
}
