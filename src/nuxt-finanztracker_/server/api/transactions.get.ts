// server/api/transactions.get.ts
// Importiere Prisma ORM
import { PrismaClient } from '@prisma/client'

// Erstelle Prisma-Instanz
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // Zukünftig: Benutzer-ID aus der Anfrage lesen
  // const userId = Number(getQuery(event).user_id)
  // if (!userId) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: 'Missing user_id'
  //   })
  // }

  // Query-Parameter lesen (z.B. /api/transactions?type=recurring)
  const query = getQuery(event)

  // Einnahmen und Ausgaben gleichzeitig abfragen
  const [expenses, incomes] = await Promise.all([
    prisma.expenses.findMany({
      // where: { user_id: BigInt(userId) },
      include: { categories: true, user: true }
    }),
    prisma.incomes.findMany({
      // where: { user_id: BigInt(userId) },
      include: { categories: true, user: true }
    })
  ])

  // Ausgaben formatieren
  const formattedExpenses = expenses.map(exp => ({
    type: 'Ausgabe',
    date: exp.date.toISOString().split('T')[0],
    time: '—',
    amount: `-${exp.amount.toFixed(2)} €`,
    interval: exp.interval,
    owner: exp.user?.username || 'Unbekannt',
    use: exp.use,
    purpose: exp.use,   //mit source zusammenfügen in purpose
    category: exp.categories?.name || '',
    comment: exp.note || ''
  }))

  // Einnahmen formatieren
  const formattedIncomes = incomes.map(inc => ({
    type: 'Einnahme',
    date: inc.date.toISOString().split('T')[0],
    time: '—',
    amount: `+${inc.amount.toFixed(2)} €`,
    interval: inc.interval,
    owner: inc.user?.username || 'Unbekannt',
    source: inc.source,
    purpose: inc.source,  //mit use zusammenfügen in purpose
    category: inc.categories?.name || '',
    comment: inc.note || ''
  }))

  // Beide zusammen zurückgeben, nach Datum sortiert
  const combined = [...formattedExpenses, ...formattedIncomes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  // Nur wiederkehrende Zahlungen zurückgeben (Dauerauftrag) ---
  if (query.type === 'recurring') {
    return combined.filter(t =>
      t.interval && t.interval !== 'once'
    )
  }

  // Standard: alles zurückgeben ---
  return combined
})
