
import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'
import CategoryService from '../application/CategoryService'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  
  const method = getMethod(event)

  const supabaseUser = serverSupabaseUser(event)

  if (!supabaseUser) {
    throw createError({ statusCode: 401, message: 'Nicht Authorisiert!' })
  } 

  const prismaUser = await prisma.user.findUnique({
    where: { supabaseid: supabaseUser.id }
  })  
  if (!prismaUser) {
    throw createError({ statusCode: 401, message: 'Benutzer nicht gefunden!' })
  }

  const userId = prismaUser.userid

  try {
    switch (method) {
      case 'GET': // GET /api/categories?userId=1
        
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