import { PrismaClient } from '@prisma/client'
import Income from '../domain/Income'

const prisma = new PrismaClient()

export default class IncomeRepository {
  static async findByUserId(userId: number) {
    const results = await prisma.incomes.findMany({
      where: { user_id: BigInt(userId) },
      include: { categories: true, user: true },
      orderBy: { date: 'desc' }
    })
    return results.map(Income.fromPrisma)
  }
}
