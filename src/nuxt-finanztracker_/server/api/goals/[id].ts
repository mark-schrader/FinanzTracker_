import GoalService from '../../application/GoalService'
import { z } from 'zod'

// Validierung
// Schema zum Validieren des id-Params in der URL
const IdParamSchema = z.preprocess((val) => {
  if (val === undefined || val === null) return undefined
  return Number(val)
}, z.number().int().positive())

// Hilfsfunktion zum Vorverarbeiten von Datumswerten
const toDatePreprocess = (val: any) => {
  if (val === undefined || val === null) return undefined
  const d = val instanceof Date ? val : new Date(val)
  return d
}

// Schema zum Validieren des Request-Bodys für das Aktualisieren eines Ziels
const UpdateGoalSchema = z.object({
  userId: z.preprocess((val) => {
    if (val === undefined || val === null) return undefined
    return Number(val)
  }, z.number().int().positive().optional()),
  name: z.string().min(1).optional(),
  target: z.preprocess((val) => {
    if (val === undefined || val === null) return undefined
    return Number(val)
  }, z.number().nonnegative().optional()),
  saved: z.preprocess((val) => {
    if (val === undefined || val === null) return undefined
    return Number(val)
  }, z.number().nonnegative().optional()),
  dueDate: z.preprocess(toDatePreprocess, z.instanceof(Date).refine((d: Date) => !isNaN(d.getTime()), { message: 'Invalid date' }).optional())
})

// Handler für die API-Endpunkte
export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const idRaw = getRouterParam(event, 'id')
  if (!idRaw) throw createError({ statusCode: 400, message: 'Missing id param' })

  try {
    const idParsed = IdParamSchema.safeParse(idRaw)
    if (!idParsed.success) throw createError({ statusCode: 400, message: 'Invalid id param' })
    const id = Number(idParsed.data)

    // Behandeln der verschiedenen Anfragen-Methoden
    switch (method) {
      case 'GET': // GET /api/goals/5
        return await GoalService.getGoalById(Number(id))  // Ausgabe eines einzelnen Ziels

      case 'PUT': { // PUT /api/goals/5
        const body = await readBody(event)
        const parsed = UpdateGoalSchema.safeParse(body)
        if (!parsed.success) {
          throw createError({ statusCode: 400, message: `Invalid body: ${JSON.stringify(parsed.error.errors)}` })
        }

        const payload: any = {
          userId: parsed.data.userId,
          name: parsed.data.name,
          target: parsed.data.target,
          saved: parsed.data.saved,
          dueDate: parsed.data.dueDate
        }

        return await GoalService.updateGoal(Number(id), payload) // Aktualisierung eines Ziels
      }

      case 'DELETE': // DELETE /api/goals/5
        return await GoalService.deleteGoal(Number(id))    // Löschen eines Ziels

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[goal by id API error]', err)
    throw createError({ statusCode: err.statusCode ?? 500, message: err.message || 'Server error' })
  }
})