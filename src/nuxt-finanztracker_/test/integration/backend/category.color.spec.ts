// category.color.spec.ts
// Integration test to verify that category colors are stored and retrieved correctly
import { describe, it, expect, afterEach } from 'vitest'
import { prisma, TEST_USER_ID } from '../../setup.prisma'
import { cleanupUserData } from '../../utils/cleanup'

describe('Backend Integration: Category with color', () => {
  afterEach(async () => {
    await cleanupUserData()
  })

  it('stores and reads a category color correctly', async () => {
    const created = await prisma.categories.create({
      data: {
        name: 'TEST_CATEGORY_COLOR',
        type: 'income',
        color: '#123abc',
        user_id: TEST_USER_ID,
      },
    })

    const found = await prisma.categories.findUnique({
      where: { id: created.id },
    })

    expect(found).not.toBeNull()
    expect(found?.color).toBe('#123abc')
  })
})
