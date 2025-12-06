import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class GoalRepository {
  async findByUserId(userId: number) {
    return prisma.goals.findMany({
      where: { user_id: Number(userId) },
      orderBy: { due_date: 'asc' }
    })
  }

  async findById(id: number) {
    return prisma.goals.findUnique({
      where: { id }
    })
  }

  async create(data: any) {
    const payload: any = {
      user_id: Number(data.user_id),
      name: data.name,
      target: data.target,
      saved: data.saved !== undefined ? data.saved : undefined,
      due_date: data.due_date ? new Date(data.due_date) : undefined
    }

    return prisma.goals.create({ data: payload })
  }

  async update(id: number, data: any) {
    const payload: any = { ...data }
    if (data.user_id !== undefined) payload.user_id = Number(data.user_id)
    if (data.due_date !== undefined) payload.due_date = data.due_date ? new Date(data.due_date) : null
    if (data.target !== undefined) payload.target = data.target
    if (data.saved !== undefined) payload.saved = data.saved

    return prisma.goals.update({ where: { id }, data: payload })
  }

  async remove(id: number) {
    await prisma.goals.delete({ where: { id } })
    return true
  }
}