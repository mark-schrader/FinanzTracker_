export interface Category {
  id: number
  name: string
  type: string
  user_id?: bigint | null
  icon?: string | null
  color?: string | null
  createdAt?: Date
  updatedAt?: Date
}
