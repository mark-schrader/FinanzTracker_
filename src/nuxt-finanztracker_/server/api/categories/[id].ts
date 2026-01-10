import CategoryService from '../../application/CategoryService'
import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'
import { IdParamSchema } from '../../utility/validationUtility'
import { z } from 'zod'

// Schema zum Validieren des Request-Bodys für das Aktualisieren einer Kategorie
const UpdateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  icon: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  userId: z.preprocess((val) => {
    if (val === undefined || val === null) return undefined
    return Number(val)
  }, z.number().int().positive().optional())
})

// Handler für die API-Endpunkte
export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const idRaw = getRouterParam(event, 'id')
  if (!idRaw) throw createError({ statusCode: 400, message: 'Missing id param' })

  const supabaseUser = await serverSupabaseUser(event)
  if (!supabaseUser) throw createError({ statusCode: 401, message: 'Nicht Authorisiert!' })
  const prisma = new PrismaClient()
  const prismaUser = await prisma.user.findUnique({ where: { supabaseid: supabaseUser.id } })
  if (!prismaUser) throw createError({ statusCode: 401, message: 'Benutzer nicht gefunden!' })
  const userId = prismaUser.userid

  try {
    const idParsed = IdParamSchema.safeParse(idRaw)
    if (!idParsed.success) throw createError({ statusCode: 400, message: 'Invalid id param' })
    const id = Number(idParsed.data)

    // Behandeln der verschiedenen Anfragen-Methoden
    switch (method) {
      case 'GET':   // GET /api/categories/5
        return await CategoryService.getCategoryByCategoryId(Number(id))    // Ausgabe einer einzelnen Kategorie

      case 'PUT': { // PUT /api/categories/5
        const body = await readBody(event)
        const parsed = UpdateCategorySchema.safeParse(body)
        if (!parsed.success) {
          const err = parsed.error
          throw createError({ statusCode: 400, message: `Invalid body: ${JSON.stringify(err.errors)}` })
        }

        return await CategoryService.updateCategory(Number(id), { // Aktualisierung einer Kategorie
          name: parsed.data.name,
          type: parsed.data.type,
          icon: parsed.data.icon,
          color: parsed.data.color,
          userId: userId
        })
      }

      case 'DELETE':  // DELETE /api/categories/5
        return await CategoryService.deleteCategory(Number(id))     // Löschen einer Kategorie

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[category by id API error]', err)
    throw createError({ statusCode: err.statusCode ?? 500, message: err.message || 'Server error' })
  }
})