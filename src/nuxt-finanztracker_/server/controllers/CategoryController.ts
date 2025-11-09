import CategoryService from '../services/CategoryService'

export default class CategoryController {
  static async getAll(userId: number) {
    return await CategoryService.getAllCategories(userId)
  }
}
