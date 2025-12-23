// test/integration/backend/transaction.expense.delete.spec.ts
import { describe, it, expect, afterEach, afterAll } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./prisma/test.db'
    }
  }
})

let categoryId: number | null = null
let expenseId: number | null = null

describe('Integration: Expense löschen', () => {

  afterEach(async () => {
    // Reihenfolge wegen FK!
    if (expenseId) {
      await prisma.expenses.delete({ where: { id: expenseId } }).catch(() => {})
      expenseId = null
    }

    if (categoryId) {
      await prisma.categories.delete({ where: { id: categoryId } }).catch(() => {})
      categoryId = null
    }
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('löscht eine Ausgabe aus der expenses Tabelle', async () => {

    // Kategorie (expense) anlegen
    const category = await prisma.categories.create({
      data: {
        name: 'TEST_EXPENSE_CATEGORY',
        type: 'expense',
        user_id: 1
      }
    })
    categoryId = category.id

    // Expense anlegen
    const expense = await prisma.expenses.create({
      data: {
        amount: 50,
        category_id: category.id,
        user_id: 1,
        date: new Date(),
        interval: 'once'
      }
    })
    expenseId = expense.id

    // Expense löschen
    await prisma.expenses.delete({
      where: { id: expense.id }
    })

    // Prüfen: weg
    const found = await prisma.expenses.findUnique({
      where: { id: expense.id }
    })

    expect(found).toBeNull()
  })
})

