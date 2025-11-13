import {CategoryRepository} from '../repositories/CategoryRepository'

export default class CategoryService {

  static async getCategoryByUserId(userId: number) {
    const repository = new CategoryRepository()
    const categories = await repository.findByUserId(userId)
    return categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      type: cat.type,
      icon: cat.icon,
      color: cat.color
    }))
  }

  static async getCategoryByCategoryId(id: number) {
    const repository = new CategoryRepository()
    const category = await repository.findByCategoryId(id)
    
    if (!category) {
      throw new Error(`Category with id ${id} not found`)
    }

    return {
      id: category.id,
      name: category.name,
      type: category.type,
      icon: category.icon,
      color: category.color
    }
  }

  static async createCategory(data: any) {
    const repo = new CategoryRepository()
    const payload = {
      name: data.name,
      type: data.type,
      user_id: data.userId !== undefined ? BigInt(data.userId) : (data.user_id ?? undefined),
      icon: data.icon ?? null,
      color: data.color ?? null
    }
    const created = await repo.create(payload)
    return {
      id: created.id,
      name: created.name,
      type: created.type,
      icon: created.icon,
      color: created.color
    }
  }

  static async updateCategory(id: number, data: any) {
    const repo = new CategoryRepository()
    const updateData: any = {}
    if (data.name !== undefined) updateData.name = data.name
    if (data.type !== undefined) updateData.type = data.type
    if (data.icon !== undefined) updateData.icon = data.icon
    if (data.color !== undefined) updateData.color = data.color
    if (data.userId !== undefined) updateData.user_id = BigInt(data.userId)

    const updated = await repo.update(id, updateData)
    return {
      id: updated.id,
      name: updated.name,
      type: updated.type,
      icon: updated.icon,
      color: updated.color
    }
  }

  static async deleteCategory(id: number) {
    const repo = new CategoryRepository()
    const result = await repo.remove(id)
    if (!result) throw new Error(`Failed to delete category with id ${id}`)
    return { message: 'Category deleted', id }
  }
}