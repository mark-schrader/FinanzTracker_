
import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'
import ExpenseService from '../application/ExpenseService'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')

  const supabaseUser = serverSupabaseUser(event)

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
    switch (method) {
      case 'GET':
        if (id) { // Anzeige einer einzelnen Ausgabe
          // GET /api/expenses/5
          return await ExpenseService.getExpenseById(Number(id))

        } else {  // Anzeige aller Ausgaben eines Benutzers
          // GET /api/expenses?userId=123
          if (!userId) throw createError({ statusCode: 400, message: 'Missing userId' })
          return await ExpenseService.getExpensesByUserId(Number(userId))
        }

      case 'POST': { // Anlegen einer neuen Ausgabe
        // POST /api/expenses
        const body = await readBody(event)
        return await ExpenseService.createExpense({
          userId: Number(body.userId), 
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
        return await ExpenseService.updateExpense(Number(id), body)
      }

      case 'DELETE': // Löschen einer Ausgabe
        // DELETE /api/expenses/5
        if (!id) throw createError({ statusCode: 400, message: 'Missing ID' })
        return await ExpenseService.deleteExpense(Number(id))

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (error: any) {
    console.error('[expenses API error]', error)
    throw createError({ statusCode: 500, message: error.message || 'Server error' })
  }
})