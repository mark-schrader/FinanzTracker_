import GoalRepository from '../repositories/GoalRepository'
import Goal, { CreateGoalDTO } from '../domain/Goal'

export default class GoalService {
  static async getGoalsByUserId(userId: number) {
    const repo = new GoalRepository()
    const goals = await repo.findByUserId(userId)
    return goals.map((g: any) => Goal.fromPrisma(g))
  }

  static async getGoalById(id: number) {
    const repo = new GoalRepository()
    const goal = await repo.findById(id)
    if (!goal) throw new Error(`Goal with id ${id} not found`)
    return Goal.fromPrisma(goal)
  }

  static async createGoal(data: CreateGoalDTO) {
    const repo = new GoalRepository()
    const created = await repo.create({
      user_id: Number(data.userId),
      name: data.name,
      target: parseFloat(String(data.target)),
      saved: data.saved !== undefined ? parseFloat(String(data.saved)) : undefined,
      due_date: data.dueDate ? new Date(data.dueDate) : undefined
    })
    return {
      message: 'Goal created successfully',
      goal: Goal.fromPrisma(created)
    }
  }

  static async updateGoal(id: number, data: any) {
    const repo = new GoalRepository()
    const updateData: any = {}

    if (data.userId !== undefined) updateData.user_id = Number(data.userId)
    if (data.name !== undefined) updateData.name = data.name
    if (data.target !== undefined) updateData.target = parseFloat(String(data.target))
    if (data.saved !== undefined) updateData.saved = parseFloat(String(data.saved))
    if (data.dueDate !== undefined) updateData.due_date = data.dueDate ? new Date(data.dueDate) : null

    const updated = await repo.update(id, updateData)
    return {
      message: 'Goal updated successfully',
      goal: Goal.fromPrisma(updated)
    }
  }

  static async deleteGoal(id: number) {
    const repo = new GoalRepository()
    await repo.remove(id)
    return { message: 'Goal deleted successfully', id }
  }
}