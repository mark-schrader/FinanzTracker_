import ExpenseService from '../../application/ExpenseService'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')
  const userId = getQuery(event).userId // GET /api/expenses?userId=123

  try {
    switch (method) {
      case 'GET':
        // Anzeige einer einzelnen Ausgabe
          // GET /api/expenses/5
          return await ExpenseService.getExpenseById(Number(id))

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
        /*
        * fetch('http://localhost:3000/api/expenses/5', {
        * method: 'DELETE'
        * })
        * .then(data => console.log('Antwort:', data))
        * .catch(err => console.error('Fehler:', err));
        */

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (error: any) {
    console.error('[expenses API error]', error)
    throw createError({ statusCode: 500, message: error.message || 'Server error' })
  }
})