
// src/.../server/api/incomes.ts

import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'
import IncomeService from '../application/IncomeService'
import { z } from 'zod'
import { QueryUserIdSchema, toDatePreprocess, IntervalEnum } from '../utility/validationUtility'


// Schema zum Validieren des Request-Bodys für das Erstellen eines neuen Einkommens
const CreateIncomeSchema = z.object({
  userId: z.preprocess((val) => (val === undefined || val === null ? undefined : Number(val)), z.number().int().positive()),
  categoryId: z.preprocess((val) => (val === undefined || val === null ? undefined : Number(val)), z.number().int().positive()),
  source: z.string().min(1).optional(),
  amount: z.preprocess((val) => (val === undefined || val === null ? undefined : Number(val)), z.number().positive()),
  date: z.preprocess(toDatePreprocess, z.instanceof(Date).refine((d: Date) => !isNaN(d.getTime()), { message: 'Invalid date' })),
  interval: IntervalEnum.optional(),
  note: z.string().optional().nullable()
})

// Handler für die API-Endpunkte
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

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
  
  const id = getRouterParam(event, 'id')
 

  try {
    // Behandeln der verschiedenen Anfragen-Methoden
    switch (method) {
      case 'GET':
        if (id) { // Anzeige einer einzelnen Einnahme
          // GET /api/incomes/5
          return await IncomeService.getIncomeById(Number(id))
        } else {  // Anzeige aller Einnahmen eines Benutzers
          // GET /api/incomes?userId=123
          if (!userId) throw createError({ statusCode: 400, message: 'Missing userId' })
          return await IncomeService.getIncomesByUserId(userId)
        }

      case 'POST': { // Anlegen einer neuen Einnahme
        // POST /api/incomes
        const body = await readBody(event)
        return await IncomeService.createIncome({
          userId: userId,
          categoryId: Number(body.categoryId),
          source: body.source,
          amount: Number(body.amount),
          date: body.date,
          interval: body.interval,
          note: body.note,
        })
      }

      case 'PUT': { // Verändern einer Einnahme
        // PUT /api/incomes/5
        if (!id) throw createError({ statusCode: 400, message: 'Missing ID' })
        const body = await readBody(event)
        const parsed = CreateIncomeSchema.safeParse(body)
        if (!parsed.success) {
          throw createError({ statusCode: 400, message: `Invalid body: ${JSON.stringify(parsed.error.errors)}` })
        }

        const payload: any = {
          userId: userId,
          categoryId: parsed.data.categoryId,
          source: parsed.data.source,
          amount: parsed.data.amount,
          date: parsed.data.date,
          interval: parsed.data.interval,
          note: parsed.data.note
        }

        return await IncomeService.updateIncome(Number(id), payload) // Aktualisieren eines Einkommens
      }

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (error: any) {
    console.error('[incomes API error]', error)
    throw createError({ statusCode: error.statusCode ?? 500, message: error.message || 'Server error' })
  }
})