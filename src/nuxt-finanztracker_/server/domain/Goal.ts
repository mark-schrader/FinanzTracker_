import { formatAmount, formatDate } from '../utility/transactionFormatUtility'

export default class Goal {
  constructor(
    public id: number,
    public userId: number,
    public name: string,
    public target: number,
    public saved: number | null = 0,
    public dueDate?: Date | null,
    public createdAt?: Date | null,
    public user?: any
  ) {}

  get formattedTarget(): string {
    return formatAmount(this.target, 'income')
  }

  get formattedSaved(): string {
    return formatAmount(this.saved ?? 0, 'income')
  }

  get formattedDueDate(): string | null {
    return this.dueDate ? formatDate(this.dueDate) : null
  }

  static fromPrisma(prismaGoal: any): Goal {
    return new Goal(
      prismaGoal.id,
      Number(prismaGoal.user_id),
      prismaGoal.name,
      Number(prismaGoal.target),
      prismaGoal.saved !== null && prismaGoal.saved !== undefined ? Number(prismaGoal.saved) : 0,
      prismaGoal.due_date ?? undefined,
      prismaGoal.created_at ?? undefined,
      prismaGoal.user
    )
  }
}

export interface CreateGoalDTO {
  userId: number
  name: string
  target: number | string
  saved?: number | string
  dueDate?: string | Date | null
}