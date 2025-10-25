import { PrismaClient, Prisma } from '@prisma/client'
import { z, ZodError } from 'zod'

const prisma = new PrismaClient()

// Zod Schema für Eingabevalidierung
const incomeSchema = z.object({
  amount: z.string().min(1, 'Betrag ist erforderlich'),
  date: z.string().min(1, 'Datum ist erforderlich'),
  source: z.string().min(1, 'Quelle ist erforderlich'),
  category: z.string().min(1, 'Kategorie ist erforderlich'),
  note: z.string().optional(),
  interval: z.enum(['once', 'weekly', 'monthly', 'semesterly', 'annual']).optional()
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log('➡️ Income POST Body:', body)

    //Validierung
    const parsed = incomeSchema.parse(body)

    const income = await prisma.incomes.create({
      data: {
        amount: new Prisma.Decimal(parsed.amount),
        date: new Date(parsed.date),
        source: parsed.source,
        category_id: parseInt(parsed.category, 10),
        interval: parsed.interval || 'once',
        note: parsed.note || null,
        user_id: null
      }
    })

    return { success: true, income }
  } catch (error: unknown) {
    console.error('Fehler in /api/income:', error)

    //Wenn es ein Zod-Fehler ist → schicke Details ans Frontend
  if (error instanceof ZodError) {
  const zodErr = error as any
  return {
    status: 400,
    error: 'Validierungsfehler',
    details: zodErr.errors
  }
}

    // 🔸 Anderer Fehler (z. B. Datenbank)
    return {
      status: 500,
      error: 'Serverfehler beim Speichern der Einnahme'
    }
  }
})
