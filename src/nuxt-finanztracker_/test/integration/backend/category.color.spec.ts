// src/nuxt-finanztracker_/test/integration/backend/category.color.spec.ts
import { describe, it, expect, afterEach, afterAll } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

let createdCategoryId: number | null = null

describe('Backend Integration: Kategorie mit Farbe', () => {

  afterEach(async () => {
    // Nur die Kategorie löschen, die dieser Test angelegt hat
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

  it('speichert und liest die Farbe einer Kategorie korrekt', async () => {
    // Kategorie mit Farbe erstellen
    const created = await prisma.categories.create({
      data: {
        name: 'TEST_CATEGORY_COLOR',
        type: 'income',
        color: '#123abc',
        user_id: 1
      }
    })

    createdCategoryId = created.id

    // Kategorie erneut laden
    const found = await prisma.categories.findUnique({
      where: { id: created.id }
    })

    // Assertions
    expect(found).not.toBeNull()
    expect(found?.color).toBe('#123abc')
  })
})
