// test/integration/backend/delete.expense.transaction.spec.ts
import { describe, it, expect, afterAll } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Integration: Expense löschen', () => {
  it('löscht Ausgaben aus der DB aus der "expenses" Tabelle', async () => {
    const expense = await prisma.expenses.create({
    data: {
        amount: 100,
        date: new Date(),
        user_id: 1,
        category_id: 1,
        interval: 'once'
      }
    }) 
    await prisma.expenses.delete({
      where: { id: expense.id }
    })
    const deleted = await prisma.expenses.findUnique({
      where: { id: expense.id }
    })
    expect(deleted).toBeNull()
  })
})

afterAll(async () => {
  await prisma.$disconnect()
})      