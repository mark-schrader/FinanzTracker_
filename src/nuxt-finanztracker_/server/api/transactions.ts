
import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'
import TransactionService from '../application/TransactionService'


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
      case 'GET': // GET /api/transactions?userId=123
        
        return await TransactionService.getAllTransactions(Number(userId))

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[transactions API error]', err)
    throw createError({ statusCode: 500, message: err.message || 'Server error' })
  }
})