// server/api/expenses.get.ts
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


  const expenses = await prisma.expenses.findMany({
    where: { user_id: userId },
    include: {
      categories: true,
      user: true
    },
    orderBy: {
      date: 'desc'
    }
  })

  return expenses.map(exp => ({
    date: exp.date.toISOString().split('T')[0],
    time: '—', // Zeit ist nicht im Schema, ggf. aus `created_at` extrahieren
    amount: `-${exp.amount.toFixed(2)} €`,
    owner: exp.user.username,
    category: exp.categories.name,
    comment: exp.note || ''
  }))
})
