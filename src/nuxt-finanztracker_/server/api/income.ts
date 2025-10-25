import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const body = await readBody(event)

  try {
    const income = await prisma.incomes.create({
      data: {
        amount: new Prisma.Decimal(body.amount),
        date: new Date(body.date),
        source: body.source || null,
        interval: body.interval || 'once',
        note: body.note || null,
        category_id: parseInt(body.category, 10),
        user_id: null,
      },
    })

    return income
  } catch (error) {
    console.error('Fehler beim Speichern der Einnahme:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Serverfehler beim Speichern der Einnahme',
    })
  }
})
