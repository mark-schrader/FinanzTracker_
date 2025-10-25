import { PrismaClient } from '@prisma/client'

const prisma = globalThis.prisma || new PrismaClient()
if (!globalThis.prisma) globalThis.prisma = prisma

export default defineEventHandler(async (event) => {
  try {
    const [expenses, incomes] = await Promise.all([
      prisma.expenses.findMany({ include: { categories: true, user: true } }),
      prisma.incomes.findMany({ include: { categories: true, user: true } })
    ])

    const formattedExpenses = expenses.map(exp => ({
      type: 'Ausgabe',
      date: exp.date.toISOString().split('T')[0],
      time: '—',
      amount: `-${exp.amount.toFixed(2)} €`,
      interval: exp.interval,
      owner: exp.user?.username || 'Unbekannt',
      purpose: exp.use,
      category: exp.categories?.name || '',
      comment: exp.note || ''
    }))

    const formattedIncomes = incomes.map(inc => ({
      type: 'Einnahme',
      date: inc.date.toISOString().split('T')[0],
      time: '—',
      amount: `+${inc.amount.toFixed(2)} €`,
      interval: inc.interval,
      owner: inc.user?.username || 'Unbekannt',
      purpose: inc.source,
      category: inc.categories?.name || '',
      comment: inc.note || ''
    }))

    return [...formattedExpenses, ...formattedIncomes].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  } catch (error) {
    console.error('Transactions fetch error:', error)
    return sendError(event, { statusCode: 500, statusMessage: 'Failed to fetch transactions' })
  }
})
