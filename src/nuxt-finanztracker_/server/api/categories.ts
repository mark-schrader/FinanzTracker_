import CategoryService from '../application/CategoryService'
import { z } from 'zod'

//Validierung
// Schema zum Validieren des userId-Query-Parameters
const QueryUserIdSchema = z.preprocess((val) => {
  if (val === undefined || val === null) return undefined
  return Number(val)
}, z.number().int().positive())

// Schema zum Validieren des Request-Bodys für das Erstellen einer Kategorie
const CreateCategorySchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  userId: z.preprocess((val) => {
    if (val === undefined || val === null) return undefined
    return Number(val)
  }, z.number().int().positive().optional()),
  icon: z.string().nullable().optional(),
  color: z.string().nullable().optional()
})

// Handler für die API-Endpunkte
export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const query = getQuery(event)

  try {
    // Behandeln der verschiedenen Anfragen-Methoden
    switch (method) {
      case 'GET': { // GET /api/categories?userId=1
        const rawUserId = query.userId //?? query.user_id
        const parsed = QueryUserIdSchema.safeParse(rawUserId)
        if (!parsed.success || parsed.data === undefined) {
          throw createError({ statusCode: 400, message: 'Missing or invalid userId' })
        }
        return await CategoryService.getCategoryByUserId(Number(parsed.data)) // Ausgabe aller Kategorien eines Benutzers (mit allen, wo userID null ist)
      }

      case 'POST': { // POST /api/categories
        const body = await readBody(event)
        const parsed = CreateCategorySchema.safeParse(body)
        if (!parsed.success) {
          const err = parsed.error
          throw createError({ statusCode: 400, message: `Invalid body: ${JSON.stringify(err.errors)}` })
        }

        const payload: any = {
          name: parsed.data.name,
          type: parsed.data.type,
          userId: parsed.data.userId,
          icon: parsed.data.icon ?? null,
          color: parsed.data.color ?? null
        }

        return await CategoryService.createCategory(payload) // Erstellung einer neuen Kategorie
      }

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[categories API error]', err)
    throw createError({ statusCode: err.statusCode ?? 500, message: err.message || 'Server error' })
  }
})