import ExpenseRepository from '../repositories/ExpenseRepository'
import IncomeRepository from '../repositories/IncomeRepository'

export default class TransactionService {
  static async getAllTransactions(userId: number) {
    const [expenses, incomes] = await Promise.all([
      ExpenseRepository.findByUserId(userId),
      IncomeRepository.findByUserId(userId)
    ])

    const formattedExpenses = expenses.map(exp => ({
      type: 'Ausgabe',
      date: exp.formattedDate,
      time: '—',
      amount: exp.formattedAmount,
      interval: exp.interval,
      owner: exp.user?.username || 'Unbekannt',
      category: exp.categories?.name || '',
      purpose: exp.use,
      comment: exp.note || ''
    }))

    const formattedIncomes = incomes.map(inc => ({
      type: 'Einnahme',
      date: inc.formattedDate,
      time: '—',
      amount: inc.formattedAmount,
      interval: inc.interval,
      owner: inc.user?.username || 'Unbekannt',
      category: inc.categories?.name || '',
      purpose: inc.source,
      comment: inc.note || ''
    }))

    return [...formattedExpenses, ...formattedIncomes].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }
}
