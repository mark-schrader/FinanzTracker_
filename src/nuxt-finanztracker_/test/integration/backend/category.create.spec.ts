/// <reference types="node" />

import { describe, it, expect } from 'vitest'
import { prisma, TEST_USER_ID } from '../../setup.prisma'
import CategoryService from '../../../server/application/CategoryService'

describe('Integration: create category', () => {
  it('creates category in database', async () => {
    const category = await CategoryService.createCategory({
      name: 'Test Category',
      type: 'income',
      userId: TEST_USER_ID,
    })

    expect(category.id).toBeDefined()
    expect(category.name).toBe('Test Category')
  })
})
