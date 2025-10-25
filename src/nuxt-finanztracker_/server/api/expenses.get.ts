import { PrismaClient } from '@prisma/client'

const prisma = globalThis.prisma || new PrismaClient()
if (!globalThis.prisma) globalThis.prisma = prisma

export default defineEventHandler(async (event) => {
  const userId = Number(getQuery(event).user_id)
  if (!userId) {
    return sendError(event, { statusCode: 400, statusMessage: 'Missing user_id' })
  }

  try {
    const expenses = await prisma.expenses.findMany({
      where: { user_id: BigInt(userId) },
      include: { categories: true, user: true },
      orderBy: { date: 'desc' }
    })

    return expenses.map(exp => ({
      date: exp.date.toISOString().split('T')[0],
      time: '—',
      amount: `-${exp.amount.toFixed(2)} €`,
      owner: exp.user.username,
      category: exp.categories.name,
      comment: exp.note || ''
    }))
  } catch (error) {
    console.error('Expenses fetch error:', error)
    return sendError(event, { statusCode: 500, statusMessage: 'Failed to fetch expenses' })
  }
})
