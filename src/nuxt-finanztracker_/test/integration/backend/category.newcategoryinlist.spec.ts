// category.newcategoryinlist.spec.ts
// This test verifies that a newly created category is returned in subsequent fetches.
import { describe, it, expect, afterEach } from 'vitest'
import { prisma, TEST_USER_ID } from '../../setup.prisma'

let createdCategoryId: number | null = null

describe('Backend Integration: Fetch categories again', () => {
  afterEach(async () => {
    // Delete only the category created by this test
    if (createdCategoryId) {
      await prisma.categories
        .delete({ where: { id: createdCategoryId } })
        .catch(() => {})
      createdCategoryId = null
    }
  })

  it('returns saved categories on the next fetch', async () => {
    // Create category
    const created = await prisma.categories.create({
      data: {
        name: 'TEST_PERSISTENTE_KATEGORIE',
        type: 'expense',
        color: '#00ff00',
        icon: 'fa-persist',
        user_id: TEST_USER_ID,
      },
    })

    createdCategoryId = created.id

    // Fetch categories again
    const allCategories = await prisma.categories.findMany({
      where: { user_id: TEST_USER_ID },
    })

    const found = allCategories.find((c) => c.id === created.id)

    expect(found).toBeDefined()
    expect(found?.name).toBe('TEST_PERSISTENTE_KATEGORIE')
    expect(found?.type).toBe('expense')
    expect(found?.color).toBe('#00ff00')
  })
})
