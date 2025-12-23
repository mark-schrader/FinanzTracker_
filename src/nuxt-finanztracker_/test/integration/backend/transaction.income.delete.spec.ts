// test/integration/backend/delete.income.transaction.spec.ts
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
let incomeId: number | null = null

describe('Integration: Income löschen', () => {

  afterEach(async () => {
    // Reihenfolge ist WICHTIG (FK!)
    if (incomeId) {
      await prisma.incomes.delete({ where: { id: incomeId } }).catch(() => {})
      incomeId = null
    }

    if (categoryId) {
      await prisma.categories.delete({ where: { id: categoryId } }).catch(() => {})
      categoryId = null
    }
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('löscht eine Einnahme aus der incomes Tabelle', async () => {

    // Kategorie (income) anlegen
    const category = await prisma.categories.create({
      data: {
        name: 'TEST_INCOME_CATEGORY',
        type: 'income',
        user_id: 1
      }
    })
    categoryId = category.id

    // Income anlegen
    const income = await prisma.incomes.create({
      data: {
        amount: 100,
        category_id: category.id,
        user_id: 1,
        date: new Date(),
        interval: 'once'
      }
    })
    incomeId = income.id

    // Income löschen
    await prisma.incomes.delete({
      where: { id: income.id }
    })

    // Prüfen: weg
    const found = await prisma.incomes.findUnique({
      where: { id: income.id }
    })

    expect(found).toBeNull()
  })
})