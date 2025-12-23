// src/nuxt-finanztracker_/test/integration/backend/category.create.spec.ts
import { describe, it, expect, afterEach, afterAll } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./prisma/test.db'
    }
  }
})

let createdCategoryId: number | null = null

describe('Backend Integration: Kategorie erstellen (ohne deleteMany)', () => {

  afterEach(async () => {
    if (createdCategoryId) {
      await prisma.categories.delete({
        where: { id: createdCategoryId }
      })
      createdCategoryId = null
    }
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('speichert eine neue Kategorie', async () => {
    const created = await prisma.categories.create({
      data: {
        name: 'TEST_KATEGORIE_CREATE',
        type: 'income',
        color: '#ff0000',
        user_id: 1
      }
    })

    createdCategoryId = created.id

    const found = await prisma.categories.findUnique({
      where: { id: created.id }
    })

    expect(found).not.toBeNull()
  })
})
