import IncomeService from '../application/IncomeService'
import { z } from 'zod'
import { QueryUserIdSchema, toDatePreprocess, IntervalEnum } from '../utility/validationUtility'


// Schema zum Validieren des Request-Bodys für das Erstellen eines neuen Einkommens
const CreateIncomeSchema = z.object({
  userId: z.preprocess((val) => (val === undefined || val === null ? undefined : Number(val)), z.number().int().positive()),
  categoryId: z.preprocess((val) => (val === undefined || val === null ? undefined : Number(val)), z.number().int().positive()),
  source: z.string().min(1).optional(),
  amount: z.preprocess((val) => (val === undefined || val === null ? undefined : Number(val)), z.number().nonnegative()),
  date: z.preprocess(toDatePreprocess, z.instanceof(Date).refine((d: Date) => !isNaN(d.getTime()), { message: 'Invalid date' })),
  interval: IntervalEnum.optional(),
  note: z.string().optional().nullable()
})

// Handler für die API-Endpunkte
export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const query = getQuery(event)

  try {
    // Behandeln der verschiedenen Anfragen-Methoden
    switch (method) {
      case 'GET': { // GET /api/incomes?userId=123
        const rawUserId = query.userId ?? query.user_id
        const parsed = QueryUserIdSchema.safeParse(rawUserId)
        if (!parsed.success || parsed.data === undefined) {
          throw createError({ statusCode: 400, message: 'Missing or invalid userId' })
        }
        return await IncomeService.getIncomesByUserId(Number(parsed.data)) // Ausgabe aller Einkünfte eines Benutzers
      }

      case 'POST': { // POST /api/incomes
        const body = await readBody(event)
        const parsed = CreateIncomeSchema.safeParse(body)
        if (!parsed.success) {
          throw createError({ statusCode: 400, message: `Invalid body: ${JSON.stringify(parsed.error.errors)}` })
        }

        const payload: any = {
          userId: parsed.data.userId,
          categoryId: parsed.data.categoryId,
          source: parsed.data.source,
          amount: parsed.data.amount,
          date: parsed.data.date,
          interval: parsed.data.interval,
          note: parsed.data.note
        }

        return await IncomeService.createIncome(payload) // Erstellen eines neuen Einkommens
      }

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (error: any) {
    console.error('[incomes API error]', error)
    throw createError({ statusCode: error.statusCode ?? 500, message: error.message || 'Server error' })
  }
})