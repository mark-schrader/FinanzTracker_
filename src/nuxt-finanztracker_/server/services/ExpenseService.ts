import ExpenseRepository from '../repositories/ExpenseRepository'

export default class ExpenseService {
  static async createExpense(data: any) {
    const expense = await ExpenseRepository.create({
      userId: data.userId,
      categoryId: data.categoryId,
      use: data.use,
      amount: parseFloat(data.amount),
      date: new Date(data.date),
      interval: data.interval || 'once',
      note: data.note
    })

    return {
      message: 'Expense created successfully',
      expense
    }
  }
}
