import CategoryService from '../application/CategoryService'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const userId = getQuery(event).userId // /api/categories?userId=1

  try {
    switch (method) {
      case 'GET': // GET /api/categories?userId=1
        if (!userId) throw createError({ statusCode: 400, message: 'Missing userId' })
        return await CategoryService.getCategoryByUserId(Number(userId)) // Ausgabe der Kategorien für den angegebenen Benutzer

      case 'POST': { // POST /api/categories
        const body = await readBody(event)
        return await CategoryService.createCategory(body) // Erstellen einer neuen Kategorie mit den im Body angegebenen Daten
      }

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[categories API error]', err)
    throw createError({ statusCode: 500, message: err.message || 'Server error' })
  }
})