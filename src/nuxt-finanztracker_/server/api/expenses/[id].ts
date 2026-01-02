import ExpenseService from '../../application/ExpenseService'
import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { IdParamSchema, toDatePreprocess, IntervalEnum } from '../../utility/validationUtility'

// Schema zum Validieren des Request-Bodys für das Aktualisieren einer Ausgabe
const UpdateExpenseSchema = z.object({
  userId: z.preprocess((val) => (val === undefined || val === null ? undefined : Number(val)), z.number().int().positive().optional()),
  categoryId: z.preprocess((val) => (val === undefined || val === null ? undefined : Number(val)), z.number().int().positive().optional()),
  use: z.string().min(1).optional(),
  amount: z.preprocess((val) => (val === undefined || val === null ? undefined : Number(val)), z.number().positive().optional()),
  date: z.preprocess(toDatePreprocess, z.instanceof(Date).refine((d: Date) => !isNaN(d.getTime()), { message: 'Invalid date' }).optional()),
  interval: IntervalEnum.optional(),
  note: z.string().optional().nullable()
})

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const idRaw = getRouterParam(event, 'id')
  if (!idRaw) throw createError({ statusCode: 400, message: 'Missing id param' })

  try {
    const idParsed = IdParamSchema.safeParse(idRaw)
    if (!idParsed.success) throw createError({ statusCode: 400, message: 'Invalid id param' })
    const id = Number(idParsed.data)

    const supabaseUser = await serverSupabaseUser(event)
    if (!supabaseUser) throw createError({ statusCode: 401, message: 'Nicht Authorisiert!' })
    const prisma = new PrismaClient()
    const prismaUser = await prisma.user.findUnique({ where: { supabaseid: supabaseUser.id } })
    if (!prismaUser) throw createError({ statusCode: 401, message: 'Benutzer nicht gefunden!' })
    const userId = prismaUser.userid

    // Handler für die API-Endpunkte
    switch (method) {
      case 'PUT': { // PUT /api/expenses/:id
        const body = await readBody(event)
        const parsed = UpdateExpenseSchema.safeParse(body)
        if (!parsed.success) {
          throw createError({ statusCode: 400, message: `Invalid body: ${JSON.stringify(parsed.error.errors)}` })
        }

        const payload: any = {
          userId: userId,
          categoryId: parsed.data.categoryId,
          use: parsed.data.use,
          amount: parsed.data.amount,
          date: parsed.data.date,
          interval: parsed.data.interval,
          note: parsed.data.note
        }

        return await ExpenseService.updateExpense(Number(id), payload) // Aktualisieren einer Ausgabe
      }

      case 'DELETE': { // DELETE /api/expenses/:id
        return await ExpenseService.deleteExpense(Number(id)) // Löschen einer Ausgabe
      }
      
      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[expense by id API error]', err)
    throw createError({ statusCode: err.statusCode ?? 500, message: err.message || 'Server error' })
  }
})