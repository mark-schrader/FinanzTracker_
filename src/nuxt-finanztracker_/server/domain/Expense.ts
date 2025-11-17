import { formatAmount, formatDate } from '../utility/transactionFormatUtility'

export default class Expense {
  constructor(
    public id: number,
    public userId: number,
    public categoryId: number,
    public use: string,
    public amount: number,
    public date: Date,
    public interval: string,
    public note?: string,
    public user?: any,
    public categories?: any
  ) {}

  get formattedAmount(): string {
    return formatAmount(this.amount, 'expense')
  }

  get formattedDate(): string {
    return formatDate(this.date)
  }

  static fromPrisma(prismaExpense: any): Expense {
    return new Expense(
      prismaExpense.id,
      prismaExpense.user_id,
      prismaExpense.category_id,
      prismaExpense.use,
      Number(prismaExpense.amount),
      prismaExpense.date,
      prismaExpense.interval,
      prismaExpense.note ?? undefined,
      prismaExpense.user,
      prismaExpense.categories
    )
  }
}
