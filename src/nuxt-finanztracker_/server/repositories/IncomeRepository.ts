import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class IncomeRepository {
  /**
   *  Finde alle Einnahmen eines Nutzers
   */
  async findByUserId(userId: number) {
    return prisma.incomes.findMany({
      where: { user: { userid: userId } },
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
   * 
   * Neue Einnahme erstellen
   */
  async create(data: any) {
    
    return prisma.incomes.create({ data: data, include: { categories: true, user: true } })
  }
 

 
  
  /**   
   * Einnahme aktualisieren
   */
  async update(id: number, data: any) {
    const payload: any = { ...data }
    if (data.user_id !== undefined) payload.user_id = Number(data.user_id)
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
