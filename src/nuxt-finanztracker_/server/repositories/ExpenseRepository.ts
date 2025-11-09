import { PrismaClient } from '@prisma/client'
import Expense from '../domain/Expense'

const prisma = new PrismaClient()

export default class ExpenseRepository {
  static async findByUserId(userId: number) {
    const results = await prisma.expenses.findMany({
      where: { user_id: BigInt(userId) },
      include: { categories: true, user: true },
      orderBy: { date: 'desc' }
    })
    return results.map(Expense.fromPrisma)
  }

  static async create(data: {
    userId: number
    categoryId: number
    use: string
    amount: number
    date: Date
    interval: string
    note?: string
  }) {
    const newExpense = await prisma.expenses.create({
      data: {
        user_id: BigInt(data.userId),
        category_id: data.categoryId,
        use: data.use,
        amount: data.amount,
        date: data.date,
        interval: data.interval,
        note: data.note ?? null
      },
      include: { categories: true, user: true }
    })
    return Expense.fromPrisma(newExpense)
  }
}
