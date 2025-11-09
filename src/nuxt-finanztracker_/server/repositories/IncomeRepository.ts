import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class IncomeRepository {
  static async findByUserId(userId: number) {
    return prisma.incomes.findMany({
      where: { user_id: BigInt(userId) },
      include: { categories: true, user: true }
    })
  }
}
