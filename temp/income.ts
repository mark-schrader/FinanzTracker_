import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    return { status: 405, body: 'Method Not Allowed' }
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
        user_id: null // solange es keine Authentifizierung gibt
      }
    })

    return { status: 200, body: income }
  } catch (error) {
    console.error('Fehler beim Speichern:', error)
    return { status: 500, body: 'Serverfehler' }
  }
})
