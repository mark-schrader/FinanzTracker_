import ExpenseRepository from '../repositories/ExpenseRepository'
import IncomeRepository from '../repositories/IncomeRepository'

export default class TransactionService {
  static async getAllTransactions(userId: number) {
    // Parallel laden
    const [expenses, incomes] = await Promise.all([
      ExpenseRepository.findByUserId(userId),
      IncomeRepository.findByUserId(userId)
    ])

    // Formatierung & Transformation
    const formattedExpenses = expenses.map(exp => ({
      type: 'Ausgabe',
      date: exp.date.toISOString().split('T')[0],
      time: '—',
      amount: `-${exp.amount.toFixed(2)} €`,
      interval: exp.interval,
      owner: exp.user?.username || 'Unbekannt',
      use: exp.use,
      purpose: exp.use,
      category: exp.categories?.name || '',
      comment: exp.note || ''
    }))

    const formattedIncomes = incomes.map(inc => ({
      type: 'Einnahme',
      date: inc.date.toISOString().split('T')[0],
      time: '—',
      amount: `+${inc.amount.toFixed(2)} €`,
      interval: inc.interval,
      owner: inc.user?.username || 'Unbekannt',
      source: inc.source,
      purpose: inc.source,
      category: inc.categories?.name || '',
      comment: inc.note || ''
    }))

    // Sortieren und zurückgeben
    return [...formattedExpenses, ...formattedIncomes].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }
}
