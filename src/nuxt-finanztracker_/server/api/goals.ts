import GoalService from '../application/GoalService'
import { z } from 'zod'
import { QueryUserIdSchema, toDatePreprocess } from '../utility/validationUtility'

// Schema zum Validieren des Request-Bodys für das Erstellen eines neuen Ziels
const CreateGoalSchema = z.object({
  userId: z.preprocess((val) => {
    if (val === undefined || val === null) return undefined
    return Number(val)
  }, z.number().int().positive()),
  name: z.string().min(1).refine((val) => !val.startsWith(' '), {
      message: "Name darf nicht mit einem Leerzeichen beginnen"
    }),
  target: z.preprocess((val) => {
    if (val === undefined || val === null) return undefined
    return Number(val)
  }, z.number().positive()),
  saved: z.preprocess((val) => {
    if (val === undefined || val === null) return undefined
    return Number(val)
  }, z.number().nonnegative().optional()),
  dueDate: z.preprocess(toDatePreprocess, z.instanceof(Date).refine((d: Date) => !isNaN(d.getTime()), { message: 'Invalid date' }))
})

// Handler für die API-Endpunkte
export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const query = getQuery(event)

  try {
    switch (method) {
      case 'GET': { // GET /api/goals?userId=5
        const rawUserId = query.userId ?? query.user_id
        const parsed = QueryUserIdSchema.safeParse(rawUserId)
        if (!parsed.success || parsed.data === undefined) {
          throw createError({ statusCode: 400, message: 'Missing or invalid userId' })
        }
        return await GoalService.getGoalsByUserId(Number(parsed.data)) // Ausgabe aller Ziele eines Benutzers
      }

      case 'POST': { // POST /api/goals
        const body = await readBody(event)
        const parsed = CreateGoalSchema.safeParse(body)
        if (!parsed.success) {
          throw createError({ statusCode: 400, message: `Invalid body: ${JSON.stringify(parsed.error.errors)}` })
        }

        const payload: any = {
          userId: parsed.data.userId,
          name: parsed.data.name,
          target: parsed.data.target,
          saved: parsed.data.saved !== undefined ? parsed.data.saved : 0,
          dueDate: parsed.data.dueDate
        }

        return await GoalService.createGoal(payload) // Erstellen eines neuen Ziels
      }

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[goals API error]', err)
    throw createError({ statusCode: err.statusCode ?? 500, message: err.message || 'Server error' })
  }
})