export interface Category {
  id: number
  name: string
  type: string
  user_id?: number | null
  icon?: string | null
  color?: string | null
  createdAt?: Date
  updatedAt?: Date
}
