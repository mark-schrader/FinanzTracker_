import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class ExpenseRepository {
  static async findByUserId(userId: number) {
    return prisma.expenses.findMany({
      where: { user_id: BigInt(userId) },
      include: { categories: true, user: true }
    })
  }
}
