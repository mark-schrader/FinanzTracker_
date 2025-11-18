// server/api/expenses.get.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const userId = Number(getQuery(event).user_id) // oder später per Auth

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing user_id'
    })
  }

  const expenses = await prisma.expenses.findMany({
    where: { user_id: BigInt(userId) },
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
