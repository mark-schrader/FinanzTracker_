// test/integration/backend/delete.income.transaction.spec.ts
import { describe, it, expect, afterAll } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Integration: Income löschen', () => {
  it('löscht Einnahmen aus der DB aus der "incomes" Tabelle', async () => {
    const income = await prisma.incomes.create({
    data: {
        amount: 100,
        date: new Date(),
        user_id: 1,
        category_id: 1,
        interval: 'once'
      }
    })
    await prisma.incomes.delete({
      where: { id: income.id }
    })
    const deleted = await prisma.incomes.findUnique({
      where: { id: income.id }
    })
    expect(deleted).toBeNull()
  })
})

afterAll(async () => {
  await prisma.$disconnect()
})