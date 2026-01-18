/// <reference types="node" />

import { describe, it, expect } from 'vitest'
import { prisma, TEST_USER_ID } from '../../setup.prisma'
import TransactionService from '../../../server/application/TransactionService'
import ExpenseService from '../../../server/application/ExpenseService'

describe('Integration: delete expense', () => {
  it('deletes expense from DB', async () => {
    const category = await prisma.categories.create({
      data: {
        name: 'Food',
        type: 'expense',
        user_id: TEST_USER_ID,
      },
    })

    const expense = await prisma.expenses.create({
      data: {
        amount: 50,
        date: new Date(),
        user_id: TEST_USER_ID,
        category_id: category.id,
      },
    })

    await ExpenseService.deleteExpense(expense.id)

    const found = await prisma.expenses.findUnique({
      where: { id: expense.id },
    })

    expect(found).toBeNull()
  })
})
