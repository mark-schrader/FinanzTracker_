// src/nuxt-finanztracker_/test/integration/backend/transaction.expense.delete.spec.ts
// Integration test for deleting an expense
import { describe, it, expect, afterEach } from 'vitest'
import { prisma, TEST_USER_ID } from '../../setup.prisma'
import ExpenseService from '../../../server/application/ExpenseService'

let expenseId: number | null = null
let categoryId: number | null = null

describe('Integration: delete expense', () => {
  afterEach(async () => {
    // Cleanup only what THIS test created (FK order!)
    if (expenseId) {
      await prisma.expenses.delete({ where: { id: expenseId } }).catch(() => {})
      expenseId = null
    }
    if (categoryId) {
      await prisma.categories.delete({ where: { id: categoryId } }).catch(() => {})
      categoryId = null
    }
  })

  it('deletes expense from DB', async () => {
    const category = await prisma.categories.create({
      data: {
        name: 'TEST_EXPENSE_CATEGORY',
        type: 'expense',
        user_id: TEST_USER_ID,
      },
    })
    categoryId = category.id

    const expense = await prisma.expenses.create({
      data: {
        amount: 50,
        date: new Date(),
        user_id: TEST_USER_ID,
        category_id: category.id,
        interval: 'once', // IMPORTANT: if interval exists in schema
        note: 'TEST_EXPENSE_NOTE',
      },
    })
    expenseId = expense.id

    // Sanity check: expense exists BEFORE delete
    const before = await prisma.expenses.findUnique({ where: { id: expense.id } })
    expect(before).not.toBeNull()

    await ExpenseService.deleteExpense(expense.id)

    const after = await prisma.expenses.findUnique({ where: { id: expense.id } })
    expect(after).toBeNull()

    // Mark as deleted so cleanup doesn't try to delete again
    expenseId = null
  })
})
