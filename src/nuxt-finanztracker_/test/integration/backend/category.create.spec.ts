// test/integration/backend/category.create.spec.ts

import { describe, it, expect, afterAll } from 'vitest'
import { PrismaClient } from '@prisma/client'
import CategoryService from '../../../server/application/CategoryService'

// Create Prisma client locally for this test (Option B)
const prisma = new PrismaClient()

describe('Integration Backend: Create Category (without HTTP)', () => {
  afterAll(async () => {
    // Close DB connection after test run
    await prisma.$disconnect()
  })

  it('creates a category and persists it in the database', async () => {
    // ARRANGE
    const payload = {
      name: `Integration Category ${Date.now()}`, // unique name to avoid conflicts
      type: 'income',
      userId: 1
    }

    // ACT
    const createdCategory = await CategoryService.createCategory(payload)

    // ASSERT (service response)
    expect(createdCategory).toBeDefined()
    expect(createdCategory.name).toBe(payload.name)
    expect(createdCategory.type).toBe(payload.type)

    // ASSERT (database state)
    const categoryInDb = await prisma.categories.findFirst({
      where: { name: payload.name }
    })

    expect(categoryInDb).not.toBeNull()
    expect(categoryInDb?.name).toBe(payload.name)
    expect(categoryInDb?.type).toBe(payload.type)
  })
})
