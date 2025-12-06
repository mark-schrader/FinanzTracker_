import CategoryService from '../../application/CategoryService'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'Missing id param' })

  try {
    switch (method) {
      case 'GET':   // GET /api/categories/5
        return await CategoryService.getCategoryByCategoryId(Number(id))    // Ausgabe einer einzelnen Kategorie

      case 'PUT': { // PUT /api/categories/5
        const body = await readBody(event)
        return await CategoryService.updateCategory(Number(id), body)   // Aktualisierung einer Kategorie
      }

      case 'DELETE':  // DELETE /api/categories/5
        return await CategoryService.deleteCategory(Number(id))     // Löschen einer Kategorie

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[category by id API error]', err)
    throw createError({ statusCode: 500, message: err.message || 'Server error' })
  }
})