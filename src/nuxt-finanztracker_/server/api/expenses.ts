import ExpenseService from '../application/ExpenseService'
import { z } from 'zod'
import { QueryUserIdSchema, toDatePreprocess, IntervalEnum } from '../utility/validationUtility'

// Schema zum Validieren des Request-Bodys für das Erstellen einer neuen Ausgabe
const CreateExpenseSchema = z.object({
  userId: z.preprocess((val) => (val === undefined || val === null ? undefined : Number(val)), z.number().int().positive()),
  categoryId: z.preprocess((val) => (val === undefined || val === null ? undefined : Number(val)), z.number().int().positive()),
  use: z.string().min(1).optional(),
  amount: z.preprocess((val) => (val === undefined || val === null ? undefined : Number(val)), z.number().positive()),
  date: z.preprocess(toDatePreprocess, z.instanceof(Date).refine((d: Date) => !isNaN(d.getTime()), { message: 'Invalid date' })),
  interval: IntervalEnum.optional(),
  note: z.string().optional().nullable()
})

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const query = getQuery(event)

  try {
    // Handler für die API-Endpunkte
    switch (method) {
      case 'GET': { // GET /api/expenses?userId=123
        const rawUserId = query.userId ?? query.user_id
        const parsed = QueryUserIdSchema.safeParse(rawUserId)
        if (!parsed.success || parsed.data === undefined) {
          throw createError({ statusCode: 400, message: 'Missing or invalid userId' })
        }
        return await ExpenseService.getExpensesByUserId(Number(parsed.data)) // Ausgabe aller Ausgaben eines Benutzers
      }

      case 'POST': { // POST /api/expenses
        const body = await readBody(event)
        const parsed = CreateExpenseSchema.safeParse(body)
        if (!parsed.success) {
          throw createError({ statusCode: 400, message: `Invalid body: ${JSON.stringify(parsed.error.errors)}` })
        }

        const payload: any = {
          userId: parsed.data.userId,
          categoryId: parsed.data.categoryId,
          use: parsed.data.use,
          amount: parsed.data.amount,
          date: parsed.data.date,
          interval: parsed.data.interval,
          note: parsed.data.note
        }

        return await ExpenseService.createExpense(payload) // Erstellen einer neuen Ausgabe
      }

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (error: any) {
    console.error('[expenses API error]', error)
    throw createError({ statusCode: error.statusCode ?? 500, message: error.message || 'Server error' })
  }
})