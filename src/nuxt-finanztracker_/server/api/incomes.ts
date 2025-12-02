import IncomeService from '../application/IncomeService'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')
  const userId = getQuery(event).userId // GET /api/incomes?userId=123

  try {
    switch (method) {
      case 'GET':
        // Anzeige aller Einnahmen eines Benutzers
          // GET /api/incomes?userId=123
          if (!userId) throw createError({ statusCode: 400, message: 'Missing userId' })
          return await IncomeService.getIncomesByUserId(Number(userId))

      case 'POST': { // Anlegen einer neuen Einnahme
        // POST /api/incomes
        const body = await readBody(event)
        return await IncomeService.createIncome({
          userId: Number(body.userId),
          categoryId: Number(body.categoryId),
          source: body.source,
          amount: Number(body.amount),
          date: body.date,
          interval: body.interval,
          note: body.note,
        })
      }

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (error: any) {
    console.error('[incomes API error]', error)
    throw createError({ statusCode: 500, message: error.message || 'Server error' })
  }
})