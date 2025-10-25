import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    return { status: 405, body: 'Method Not Allowed' }
  }

  const body = await readBody(event)

  try {
    const expense = await prisma.expenses.create({
      data: {
        amount: new Prisma.Decimal(body.amount),
        date: new Date(body.date),
        use: body.use,
        interval: body.interval || 'once',
        note: body.note || null,
        category_id: parseInt(body.category, 10),
        user_id: null // später durch Authentifizierung ersetzen
      }
    })

    return { status: 200, body: expense }
  } catch (error) {
    console.error('Fehler beim Speichern der Ausgabe:', error)
    return { status: 500, body: 'Serverfehler beim Speichern der Ausgabe' }
  }
})
