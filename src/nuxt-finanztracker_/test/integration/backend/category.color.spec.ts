import { describe, it, expect, afterEach } from 'vitest'
import { prisma } from '../../setup_prisma'
import { TEST_USER_ID } from '../../setup.prisma'
import { cleanupUserData } from '../../utils/cleanup'

describe('Backend Integration: Kategorie mit Farbe', () => {

  afterEach(async () => {
    await cleanupUserData()
  })

  it('speichert und liest die Farbe einer Kategorie korrekt', async () => {
    const created = await prisma.categories.create({
      data: {
        name: 'TEST_CATEGORY_COLOR',
        type: 'income',
        color: '#123abc',
        user_id: TEST_USER_ID
      }
    })

    const found = await prisma.categories.findUnique({
      where: { id: created.id }
    })

    expect(found).not.toBeNull()
    expect(found?.color).toBe('#123abc')
  })
})
