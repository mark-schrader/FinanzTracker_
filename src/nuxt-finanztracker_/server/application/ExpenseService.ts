import ExpenseRepository from '../repositories/ExpenseRepository'
import Expense from '../domain/Expense'
import { isRecurring, advanceToNextFuture, addInterval, toDate } from '../utility/recurringUtility'
import { DEFAULT_INTERVAL } from '../domain/Interval'

export default class ExpenseService {
  static async getExpensesByUserId(userId: number) {
    const repo = new ExpenseRepository()
    let expenses = await repo.findByUserId(userId)

    // Prüfe und verarbeite überfällige Daueraufträge analog zu IncomeService
    let changed = false
    const now = new Date()
    for (const exp of expenses) {
      const interval = exp.interval ?? DEFAULT_INTERVAL
      const expDate = toDate(exp.date)
      if (!expDate) continue

      if (isRecurring(interval) && expDate <= now) {
        try {
          // Berechne erstes Datum in der Zukunft (erstes Datum > now)
          const firstFuture = advanceToNextFuture(expDate, interval)

          // Fülle alle fehlenden Vorkommen vom eingetragenen Datum bis heute auf
          let iter = addInterval(expDate, interval, 1)
          while (iter <= now) {
            await repo.create({
              user_id: exp.user_id,
              category_id: exp.category_id,
              use: exp.use,
              amount: exp.amount,
              date: iter,
              interval: DEFAULT_INTERVAL,
              note: exp.note
            })
            iter = addInterval(iter, interval, 1)
          }

          // Erstelle genau einen zukünftigen wiederkehrenden Eintrag
          await repo.create({
            user_id: exp.user_id,
            category_id: exp.category_id,
            use: exp.use,
            amount: exp.amount,
            date: firstFuture,
            interval: interval,
            note: exp.note
          })

          // Setze den alten Eintrag auf "einmal"
          await repo.update(exp.id, { interval: DEFAULT_INTERVAL })
          changed = true
        } catch (err) {
          console.error('[recurring expense processing error]', err)
        }
      }
    }

    if (changed) {
      expenses = await repo.findByUserId(userId)
    }

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
    const created = await repo.create({
      user_id: data.userId !== undefined ? Number(data.userId) : undefined,
      category_id: data.categoryId,
      use: data.use,
      amount: parseFloat(String(data.amount)),
      date: new Date(data.date),
      interval: data.interval || DEFAULT_INTERVAL,
      note: data.note
    })
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
