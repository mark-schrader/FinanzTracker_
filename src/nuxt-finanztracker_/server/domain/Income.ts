import { formatAmount, formatDate } from '../utility/transactionFormatUtility'

export default class Income {
  constructor(
    public id: number,
    public userId: number,
    public categoryId: number,
    public source: string,
    public amount: number,
    public date: Date,
    public interval: string,
    public note?: string,
    public user?: any,
    public categories?: any
  ) {}

  get formattedAmount(): string {
    return formatAmount(this.amount, 'income')
  }

  get formattedDate(): string {
    return formatDate(this.date)
  }

  static fromPrisma(prismaIncome: any): Income {
    return new Income(
      prismaIncome.id,
      prismaIncome.user_id,
      prismaIncome.category_id,
      prismaIncome.source,
      Number(prismaIncome.amount),
      prismaIncome.date,
      prismaIncome.interval,
      prismaIncome.note ?? undefined,
      prismaIncome.user,
      prismaIncome.categories
    )
  }
}

export interface CreateIncometoU {
  userId: number
  categoryId: number
  source: string
  amount: number | string
  date: string | Date
  interval?: string
  note?: string
}

