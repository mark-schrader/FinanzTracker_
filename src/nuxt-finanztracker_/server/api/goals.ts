import { serverSupabaseUser } from '#supabase/server'
import GoalService from '../application/GoalService'
import { z } from 'zod'
import { QueryUserIdSchema, toDatePreprocess } from '../utility/validationUtility'
import { PrismaClient } from '@prisma/client'

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

  const supabaseUser = await serverSupabaseUser(event)
  if (!supabaseUser) throw createError({ statusCode: 401, message: 'Nicht Authorisiert!' })

  const prisma = new PrismaClient()
  const prismaUser = await prisma.user.findUnique({ where: { supabaseid: supabaseUser.id } })
  if (!prismaUser) throw createError({ statusCode: 401, message: 'Benutzer nicht gefunden!' })
  const userId = prismaUser.userid


  try {
    switch (method) {
      case 'GET': { // GET /api/goals
        return await GoalService.getGoalsByUserId(Number(userId)) // Ausgabe aller Ziele des angemeldeten Benutzers
      }

      case 'POST': { // POST /api/goals
        const body = await readBody(event)
        const parsed = CreateGoalSchema.safeParse(body)
        if (!parsed.success) {
          throw createError({ statusCode: 400, message: `Invalid body: ${JSON.stringify(parsed.error.errors)}` })
        }

        const payload: any = {
          userId: userId,
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