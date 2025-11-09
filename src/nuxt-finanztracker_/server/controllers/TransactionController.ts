import TransactionService from '../services/TransactionService'

export default class TransactionController {
  static async getAll(userId: number) {
    if (!userId) {
      throw createError({ statusCode: 400, statusMessage: 'Missing user_id' })
    }

    return await TransactionService.getAllTransactions(userId)
  }
}
