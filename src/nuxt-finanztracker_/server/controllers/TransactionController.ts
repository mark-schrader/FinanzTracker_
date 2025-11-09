import TransactionService from '../services/TransactionService'

export default class TransactionController {
  static async getAll(userId: number | null) {
    // Validierung
    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing user_id'
      })
    }

    // Übergibt an Service
    return await TransactionService.getAllTransactions(userId)
  }
}
