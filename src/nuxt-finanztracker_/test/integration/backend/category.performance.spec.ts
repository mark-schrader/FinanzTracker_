// category.performance.spec.ts
// This test measures the performance of category creation to ensure it meets the required threshold.
import { describe, it, expect, afterEach } from 'vitest'
import { prisma, TEST_USER_ID } from '../../setup.prisma'

let createdCategoryId: number | null = null

describe('Performance: Create category < 1.5s', () => {
  afterEach(async () => {
    if (createdCategoryId) {
      await prisma.categories
        .delete({ where: { id: createdCategoryId } })
        .catch(() => {})
      createdCategoryId = null
    }
  })

  it('creates a category in under 1500ms', async () => {
    const start = performance.now()

    const created = await prisma.categories.create({
      data: {
        name: 'TEST_PERFORMANCE_CATEGORY',
        type: 'income',
        color: '#abcdef',
        user_id: TEST_USER_ID,
      },
    })

    const end = performance.now()
    const duration = end - start
    createdCategoryId = created.id

    console.log(`Create category time: ${duration.toFixed(2)} ms`)

    expect(duration).toBeLessThan(1500)
  })
})