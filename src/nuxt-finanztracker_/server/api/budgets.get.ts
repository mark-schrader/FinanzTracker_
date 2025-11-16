import { PrismaClient } from '@prisma/client'
import { serverSupabaseUser } from '#supabase/server'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const supabaseUser = await serverSupabaseUser(event)
  if (!supabaseUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Nicht authorisiert!'
    })
  }

  const prismaUser = await prisma.user.findUnique({
    where: { supabaseid: supabaseUser.id }
  })

  if (!prismaUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Benutzer nicht gefunden!'
    })
  }

  const userId = prismaUser.userid

  // Prisma Query: Alle Ausgaben vom User inkl. User und Kategorie
  const expenses = await prisma.expenses.findMany({
    where: { user_id: BigInt(userId) },
    include: {
      user: true,
      categories: true,
    },
    orderBy: {
      date: 'desc',
    },
  })

  return expenses
})
