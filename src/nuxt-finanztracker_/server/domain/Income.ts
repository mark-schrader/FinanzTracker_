export default class Income {
  constructor(
    public id: number,
    public userId: bigint,
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
    return `+${this.amount.toFixed(2)} €`
  }

  get formattedDate(): string {
    return this.date.toISOString().split('T')[0]
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
