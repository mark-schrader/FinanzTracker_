import ExpenseRepository from '../repositories/ExpenseRepository'
import Expense from '../domain/Expense'

export default class ExpenseService {
  static async getExpensesByUserId(userId: number) {
    const repo = new ExpenseRepository()
    const expenses = await repo.findByUserId(userId)
    return expenses.map((e: any) => Expense.fromPrisma(e))
  }

  static async getExpenseById(id: number) {
    const repo = new ExpenseRepository()
    const expense = await repo.findById(id)
    if (!expense) throw new Error(`Expense with id ${id} not found`)
    return Expense.fromPrisma(expense)
  }

  static async createExpense(data: any) {
    const repo = new ExpenseRepository()
  
    const prismaData = {
      amount: parseFloat(String(data.amount)),
      date: data.date ? new Date(data.date) : new Date(),
      use: data.use,
      interval: data.interval || 'once',
      note: data.note,

      categories: {
        connect: { id: Number(data.categoryId) }
      },
      user: {
        connect: { supabaseid: data.userId }
      }
    }

    const created = await repo.create(prismaData)

    return {
      message: 'Expense created successfully',
      expense: Expense.fromPrisma(created)
    }
  }

  static async updateExpense(id: number, data: any) {
    const repo = new ExpenseRepository()
    const updateData: any = {}

    if (data.userId !== undefined) updateData.user_id = Number(data.userId)
    if (data.categoryId !== undefined) updateData.category_id = data.categoryId
    if (data.use !== undefined) updateData.use = data.use
    if (data.amount !== undefined) updateData.amount = parseFloat(String(data.amount))
    if (data.date !== undefined) updateData.date = new Date(data.date)
    if (data.interval !== undefined) updateData.interval = data.interval
    if (data.note !== undefined) updateData.note = data.note

    const updated = await repo.update(id, updateData)
    return {
      message: 'Expense updated successfully',
      expense: Expense.fromPrisma(updated)
    }
  }

  static async deleteExpense(id: number) {
    const repo = new ExpenseRepository()
    await repo.remove(id)
    return { message: 'Expense deleted successfully', id }
  }
}
