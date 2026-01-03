// test/integration/backend/transaction.expense.delete.spec.ts

import { describe, it, expect, afterAll } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Integration: Delete Expense', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('deletes an expense from the expenses table', async () => {
    // ARRANGE
    // Create required category
    const category = await prisma.categories.create({
      data: {
        name: `Test Category ${Date.now()}`,
        type: 'expense',
        user_id: 1
      }
    })

    // Create expense with required date field
    const expense = await prisma.expenses.create({
      data: {
        amount: 50,
        date: new Date(),   
        category_id: category.id,
        user_id: 1
      }
    })

    // ACT
    await prisma.expenses.delete({
      where: { id: expense.id }
    })

    // ASSERT
    const deletedExpense = await prisma.expenses.findUnique({
      where: { id: expense.id }
    })

    expect(deletedExpense).toBeNull()
  })
})
