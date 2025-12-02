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
      /*
      fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: "Essen",
          type: "expense",    // z.B. "expense" oder "income"
          userId: 1,          // oder user_id
          icon: "🍔",
          color: "#FF5733"
        })
    })
        .then(res => res.json())
        .then(data => console.log("Kategorie erstellt:", data))
        .catch(err => console.error("Error:", err))
      */
      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[categories API error]', err)
    throw createError({ statusCode: 500, message: err.message || 'Server error' })
  }
})