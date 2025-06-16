import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // User-ID aus Query auslesen (z.B. ?user_id=1)
  const userId = Number(getQuery(event).user_id)
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'user_id is required' })
  }

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
