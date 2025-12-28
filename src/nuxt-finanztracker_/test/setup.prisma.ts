import { beforeEach, afterAll } from 'vitest'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

beforeEach(async () => {
  // Reihenfolge an Models anpassen, um Fremdschlüsselverletzungen zu vermeiden
  // await prisma.transaction.deleteMany()
  // await prisma.category.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})
