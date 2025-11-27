import TransactionService from '../application/TransactionService'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const userId = getQuery(event).userId // /api/transactions?userId=1

  try {
    switch (method) {
      case 'GET': // GET /api/transactions?userId=123
        if (!userId) throw createError({ statusCode: 400, message: 'Missing userId' }) // Anzeige aller Transaktionen eines Benutzers
        return await TransactionService.getAllTransactions(Number(userId))

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[transactions API error]', err)
    throw createError({ statusCode: 500, message: err.message || 'Server error' })
  }
})