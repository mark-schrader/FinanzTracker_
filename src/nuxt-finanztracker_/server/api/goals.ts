import GoalService from '../application/GoalService'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const userId = getQuery(event).userId // /api/goals?userId=1

  try {
    switch (method) {
      case 'GET': // GET /api/goals?userId=1
        if (!userId) throw createError({ statusCode: 400, message: 'Missing userId' }) 
        return await GoalService.getGoalsByUserId(Number(userId))   // Ausgabe aller Ziele für den angegebenen Benutzer

      case 'POST': { // POST /api/goals
        const body = await readBody(event)      
        return await GoalService.createGoal({   // Erstellen eines neuen Ziels mit den im Body angegebenen Daten
          userId: Number(body.userId),
          name: body.name,
          target: Number(body.target),
          saved: body.saved !== undefined ? Number(body.saved) : undefined,
          dueDate: body.dueDate ?? body.due_date ?? undefined
        })
      }

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[goals API error]', err)
    throw createError({ statusCode: 500, message: err.message || 'Server error' })
  }
})