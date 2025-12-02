import ExpenseService from '../application/ExpenseService'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')
  const userId = getQuery(event).userId // GET /api/expenses?userId=123

  try {
    switch (method) {
      case 'GET':
        // Anzeige aller Ausgaben eines Benutzers
          // GET /api/expenses?userId=123
          if (!userId) throw createError({ statusCode: 400, message: 'Missing userId' })
          return await ExpenseService.getExpensesByUserId(Number(userId))

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

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (error: any) {
    console.error('[expenses API error]', error)
    throw createError({ statusCode: 500, message: error.message || 'Server error' })
  }
})