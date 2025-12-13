import IncomeRepository from '../repositories/IncomeRepository'
import Income from '../domain/Income'
import type CreateIncometoU from '../domain/Income'
import { isRecurring, advanceToNextFuture, addInterval, toDate } from '../utility/recurringUtility'
import { DEFAULT_INTERVAL } from '../domain/Interval'

export default class IncomeService {
  static async getIncomesByUserId(userId: number) {
    const repo = new IncomeRepository()
    let incomes = await repo.findByUserId(userId)

    // Prüfe auf überfällige Daueraufträge und verarbeiten (analog zu ExpenseService)
    let changed = false
    const now = new Date()
    for (const inc of incomes) {
      const interval = inc.interval ?? DEFAULT_INTERVAL
      const incDate = toDate(inc.date)
      if (!incDate) continue

      if (isRecurring(interval) && incDate <= now) {
        try {
          // berechne nächstes Datum relativ zum eingetragenen Datum
          const nextDate = addInterval(incDate, interval, 1)

          // erstelle neuen Eintrag mit gleichem Intervall
          await repo.create({
            user_id: inc.user_id,
            category_id: inc.category_id,
            source: inc.source,
            amount: inc.amount,
            date: nextDate,
            interval: interval,
            note: inc.note
          })

          // altes auf "einmal" setzen
          await repo.update(inc.id, { interval: DEFAULT_INTERVAL })
          changed = true
        } catch (err) {
          console.error('[recurring income processing error]', err)
        }
      }
    }

    if (changed) {
      incomes = await repo.findByUserId(userId)
    }

    return incomes.map((i: any) => Income.fromPrisma(i))
  }

  static async getIncomeById(id: number) {
    const repo = new IncomeRepository()
    const income = await repo.findById(id)
    if (!income) throw new Error(`Income with id ${id} not found`)
    return Income.fromPrisma(income)
  }

  static async createIncome(data: CreateIncometoU) {
    const repo = new IncomeRepository()
    const created = await repo.create({
      user_id: data.userId !== undefined ? Number(data.userId) : undefined,
      category_id: data.categoryId,
      source: data.source,
      amount: parseFloat(String(data.amount)),
      date: data.date ? new Date(data.date) : new Date(),
      interval: data.interval || DEFAULT_INTERVAL,
      note: data.note
    })
    return {
      message: 'Income created successfully',
      income: Income.fromPrisma(created)
    }
  }

  static async updateIncome(id: number, data: any) {
    const repo = new IncomeRepository()
    const updateData: any = {}

    if (data.userId !== undefined) updateData.user_id = Number(data.userId)
    if (data.categoryId !== undefined) updateData.category_id = data.categoryId
    if (data.source !== undefined) updateData.source = data.source
    if (data.amount !== undefined) updateData.amount = parseFloat(String(data.amount))
    if (data.date !== undefined) updateData.date = new Date(data.date)
    if (data.interval !== undefined) updateData.interval = data.interval
    if (data.note !== undefined) updateData.note = data.note

    const updated = await repo.update(id, updateData)
    return {
      message: 'Income updated successfully',
      income: Income.fromPrisma(updated)
    }
  }

  static async deleteIncome(id: number) {
    const repo = new IncomeRepository()
    await repo.remove(id)
    return { message: 'Income deleted successfully', id }
  }
}