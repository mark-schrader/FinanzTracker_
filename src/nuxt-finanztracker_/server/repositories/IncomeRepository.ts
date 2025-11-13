import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function toBigInt(value: any): bigint | undefined {
  if (value === undefined || value === null) return undefined
  return typeof value === 'bigint' ? value : BigInt(value)
}

export default class IncomeRepository {
  /**
   *  Finde alle Einnahmen eines Nutzers
   */
  async findByUserId(userId: number) {
    return prisma.incomes.findMany({
      where: { user_id: toBigInt(userId) },
      include: { categories: true, user: true },
      orderBy: { date: 'desc' }
    })
  }

  /**
   * Finde eine Einnahme per ID
   */
  async findById(id: number) {
    return prisma.incomes.findUnique({
      where: { id },
      include: { categories: true, user: true }
    })
  }

  /**   
   * Neue Einnahme erstellen
   */
  async create(data: any) {
    const payload: any = {
      ...data,
      user_id: toBigInt(data.user_id),
      category_id: data.category_id,
      source: data.source,
      amount: data.amount, // Prisma will accept number or Decimal depending on client setup
      date: data.date ? new Date(data.date) : undefined,
      interval: data.interval,
      note: data.note
    }

    return prisma.incomes.create({ data: payload, include: { categories: true, user: true } })
  }
  /**   
   * Einnahme aktualisieren
   */
  async update(id: number, data: any) {
    const payload: any = { ...data }
    if (data.user_id !== undefined) payload.user_id = toBigInt(data.user_id)
    if (data.date !== undefined) payload.date = new Date(data.date)
    if (data.amount !== undefined) payload.amount = data.amount

    return prisma.incomes.update({ where: { id }, data: payload, include: { categories: true, user: true } })
  }
  /**   
   * Einnahme löschen
   */
  async remove(id: number) {
    await prisma.incomes.delete({ where: { id } })
    return true
  }
}