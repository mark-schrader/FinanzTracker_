import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class ExpenseRepository {
  /**
   *  Finde alle Ausgaben eines Nutzers
   */
  async findByUserId(userId: number) {
    return prisma.expenses.findMany({
      where: { user_id: Number(userId) },
      orderBy: { date: 'desc' },
      include: { categories: true, user: true }
    })
  }

  /**
   * Finde eine Ausgabe per ID
   */
  async findById(id: number) {
    return prisma.expenses.findUnique({
      where: { id },
      include: { categories: true, user: true }
    })
  }

  /**   
   * Neue Ausgabe erstellen
   */
  async create(data: any) {
    const payload: any = {
      ...data,
      user_id: Number(data.user_id),
      // Prisma handles Decimal/number for amount; ensure Date for date
      amount: data.amount,
      date: data.date ? new Date(data.date) : undefined
    }

    return prisma.expenses.create({ data: payload, include: { categories: true, user: true } })
  }

  /**   
   * Ausgabe aktualisieren
   */
  async update(id: number, data: any) {
    const payload: any = { ...data }
    if (data.user_id !== undefined) payload.user_id = Number(data.user_id)
    if (data.date !== undefined) payload.date = new Date(data.date)
    if (data.amount !== undefined) payload.amount = data.amount

    return prisma.expenses.update({ where: { id }, data: payload, include: { categories: true, user: true } })
  }

  /**   
   * Ausgabe löschen
   */
  async remove(id: number) {
    await prisma.expenses.delete({ where: { id } })
    return true
  }
}
