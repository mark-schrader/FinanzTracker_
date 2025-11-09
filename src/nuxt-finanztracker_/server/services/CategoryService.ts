import CategoryRepository from '../repositories/CategoryRepository'

export default class CategoryService {
  static async getAllCategories(userId: number) {
    const categories = await CategoryRepository.findByUserId(userId)
    return categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      type: cat.type,
      icon: cat.icon,
      color: cat.color
    }))
  }
}
