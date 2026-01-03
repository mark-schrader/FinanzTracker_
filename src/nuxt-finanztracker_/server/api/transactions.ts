
import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'
import TransactionService from '../application/TransactionService'
import { QueryUserIdSchema } from '../utility/validationUtility'


const prisma = new PrismaClient()

// Handler für die API-Endpunkte
export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  
  const supabaseUser = await serverSupabaseUser(event)

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
    // Behandeln der verschiedenen Anfragen-Methoden
    switch (method) {
      case 'GET': // GET /api/transactions?userId=123
        
        return await TransactionService.getAllTransactions(Number(userId))

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[transactions API error]', err)
    throw createError({ statusCode: err.statusCode ?? 500, message: err.message || 'Server error' })
  }
})