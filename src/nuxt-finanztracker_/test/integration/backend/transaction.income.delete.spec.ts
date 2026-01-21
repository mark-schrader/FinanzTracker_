// transaction.income.delete.spec.ts
// This test verifies that an income can be deleted from the database.

import { describe, it, expect, afterEach } from 'vitest'
import { prisma, TEST_USER_ID } from '../../setup.prisma'

let categoryId: number | null = null
let incomeId: number | null = null

describe('Integration: delete income', () => {
  afterEach(async () => {
    // FK order matters: delete income first, then category
    if (incomeId) {
      await prisma.incomes.delete({ where: { id: incomeId } }).catch(() => {})
      incomeId = null
    }

    if (categoryId) {
      await prisma.categories.delete({ where: { id: categoryId } }).catch(() => {})
      categoryId = null
    }
  })

  it('deletes an income from the incomes table', async () => {
    // Create income category
    const category = await prisma.categories.create({
      data: {
        name: 'TEST_INCOME_CATEGORY',
        type: 'income',
        user_id: TEST_USER_ID,
      },
    })
    categoryId = category.id

    // Create income
    const income = await prisma.incomes.create({
      data: {
        amount: 100,
        category_id: category.id,
        user_id: TEST_USER_ID,
        date: new Date(),
        note: 'TEST_INCOME_NOTE',
        // If your schema requires interval on incomes, uncomment:
        // interval: 'once',
      },
    })
    incomeId = income.id

    // Delete income
    await prisma.incomes.delete({
      where: { id: income.id },
    })

    // Verify deletion
    const found = await prisma.incomes.findUnique({
      where: { id: income.id },
    })

    expect(found).toBeNull()
  })
})
