
import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'
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

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')

  const supabaseUser = await serverSupabaseUser(event)

  if (!supabaseUser) {
    throw createError({ statusCode: 401, message: 'Nicht Authorisiert!' })
  } 

  const prismaUser = await prisma.user.findUnique({ 
    where: { supabaseid: supabaseUser.id }
  })
  if (!prismaUser) {
    throw createError({ statusCode: 401, message: 'Benutzer nicht gefunden!' })
  }

  const userId = prismaUser.userid

  try {
    // Handler für die API-Endpunkte
    switch (method) {
      case 'GET':
        if (id) { // Anzeige einer einzelnen Ausgabe
          // GET /api/expenses/5
          return await ExpenseService.getExpenseById(Number(id))

        } else {  // Anzeige aller Ausgaben eines Benutzers
          // GET /api/expenses?userId=123
          if (!userId) throw createError({ statusCode: 400, message: 'Missing userId' })
          return await ExpenseService.getExpensesByUserId(userId)
        }

      case 'POST': { // Anlegen einer neuen Ausgabe
        // POST /api/expenses
        const body = await readBody(event)
        return await ExpenseService.createExpense({
          userId: supabaseUser.id, 
          categoryId: body.categoryId,
          use: body.use,
          amount: body.amount,
          date: body.date,
          interval: body.interval,
          note: body.note,
        })
      }

      case 'PUT': { // Verändern einer Ausgabe
        // PUT /api/expenses/5
        if (!id) throw createError({ statusCode: 400, message: 'Missing ID' })
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