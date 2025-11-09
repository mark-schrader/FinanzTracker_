import ExpenseService from '../services/ExpenseService'

export default class ExpenseController {
  static async create(data: any) {
    if (!data.userId || !data.amount || !data.categoryId || !data.use || !data.date) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      })
    }

    return await ExpenseService.createExpense(data)
  }
}
