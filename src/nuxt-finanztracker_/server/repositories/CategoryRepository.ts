import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class CategoryRepository {
  static async findByUserId(userId: number) {
    return await prisma.categories.findMany({
      where: {
        OR: [
          { user_id: BigInt(userId) },
          { user_id: null } // globale Kategorien (systemweit)
        ]
      },
      orderBy: { name: 'asc' }
    })
  }
}
