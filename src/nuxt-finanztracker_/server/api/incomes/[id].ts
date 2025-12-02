import IncomeService from '../../application/IncomeService'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')
  const userId = getQuery(event).userId // GET /api/incomes?userId=123

  try {
    switch (method) {
      case 'GET':
          // Anzeige einer einzelnen Einnahme
          // GET /api/incomes/5
          return await IncomeService.getIncomeById(Number(id))

      case 'PUT': { // Verändern einer Einnahme
        // PUT /api/incomes/5
        if (!id) throw createError({ statusCode: 400, message: 'Missing ID' })
        const body = await readBody(event)
        return await IncomeService.updateIncome(Number(id), body)
      }

      case 'DELETE': // Löschen einer Einnahme
        // DELETE /api/incomes/5
        if (!id) throw createError({ statusCode: 400, message: 'Missing ID' })
        return await IncomeService.deleteIncome(Number(id))
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
    console.error('[incomes API error]', error)
    throw createError({ statusCode: 500, message: error.message || 'Server error' })
  }
})