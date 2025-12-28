// src/nuxt-finanztracker_/test/integration/backend/category.performance.spec.ts
import { describe, it, expect, afterEach, afterAll } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

let createdCategoryId: number | null = null

describe('Performance: Kategorie speichern < 1.5s', () => {

  afterEach(async () => {
    if (createdCategoryId) {
      await prisma.categories.delete({
        where: { id: createdCategoryId }
      }).catch(() => {})
      createdCategoryId = null
    }
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('speichert eine Kategorie in unter 1500ms', async () => {

    const start = performance.now()

    const created = await prisma.categories.create({
      data: {
        name: 'TEST_PERFORMANCE_CATEGORY',
        type: 'income',
        color: '#abcdef',
        user_id: 1
      }
    })

    const end = performance.now()
    const duration = end - start

    createdCategoryId = created.id

    console.log(`ZeitKategorie speichern: ${duration.toFixed(2)} ms`)

    expect(duration).toBeLessThan(1500)
  })
})
