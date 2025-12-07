import TransactionService from '../application/TransactionService'
import { z } from 'zod'

// Validierung
// Schema zum Validieren des userId-Query-Params
const QueryUserIdSchema = z.preprocess((val) => {
  if (val === undefined || val === null) return undefined
  return Number(val)
}, z.number().int().positive())

// Handler für die API-Endpunkte
export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const query = getQuery(event)

  try {
    // Behandeln der verschiedenen Anfragen-Methoden
    switch (method) {
      case 'GET': { // GET /api/transactions?userId=123
        const rawUserId = query.userId ?? query.user_id
        const parsed = QueryUserIdSchema.safeParse(rawUserId)
        if (!parsed.success || parsed.data === undefined) {
          throw createError({ statusCode: 400, message: 'Missing or invalid userId' })
        }
        return await TransactionService.getAllTransactions(Number(parsed.data)) // Ausgabe aller Transaktionen eines Benutzers
      }

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[transactions API error]', err)
    throw createError({ statusCode: err.statusCode ?? 500, message: err.message || 'Server error' })
  }
})