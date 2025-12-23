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

describe('Backend Integration: Kategorien erneut abrufen', () => {

  afterEach(async () => {
    // nur die Kategorie löschen, die dieser Test erstellt hat
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

  it('liefert gespeicherte Kategorien beim nächsten Abruf zurück', async () => {
    // Kategorie speichern
    const created = await prisma.categories.create({
      data: {
        name: 'TEST_PERSISTENTE_KATEGORIE',
        type: 'expense',
        color: '#00ff00',
        icon: 'fa-persist',
        user_id: 1
      }
    })

    createdCategoryId = created.id

    // Kategorien erneut abrufen
    const allCategories = await prisma.categories.findMany({
      where: { user_id: 1 }
    })

    // Erwartung: Kategorie ist enthalten
    const found = allCategories.find(c => c.id === created.id)

    expect(found).toBeDefined()
    expect(found?.name).toBe('TEST_PERSISTENTE_KATEGORIE')
    expect(found?.type).toBe('expense')
    expect(found?.color).toBe('#00ff00')
  })
})
