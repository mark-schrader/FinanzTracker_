import GoalService from '../../application/GoalService'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'Missing id param' })

  try {
    switch (method) {
      case 'GET': // GET /api/goals/5
        return await GoalService.getGoalById(Number(id)) // Ausgabe eines einzelnen Ziels

      case 'PUT': { // PUT /api/goals/5
        const body = await readBody(event)
        return await GoalService.updateGoal(Number(id), { // Aktualisierung eines Ziels
          userId: body.userId,
          name: body.name,
          target: body.target,
          saved: body.saved,
          dueDate: body.dueDate ?? body.due_date
        })
      }

      case 'DELETE': // DELETE /api/goals/5
        return await GoalService.deleteGoal(Number(id)) // Löschen eines Ziels

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[goal by id API error]', err)
    throw createError({ statusCode: 500, message: err.message || 'Server error' })
  }
})