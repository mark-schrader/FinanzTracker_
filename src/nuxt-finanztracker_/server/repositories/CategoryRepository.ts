import { PrismaClient } from '@prisma/client'
import type { Category } from '../domain/Category'

const prisma = new PrismaClient()

export class CategoryRepository {
  /**
   * Finde alle Kategorien eines Nutzers (ID = NULL AND user_id)
   */
   async findByUserId(userId: number) {
    return await prisma.categories.findMany({
      where: {
        OR: [
          { user_id: Number(userId) },
          { user_id: null } // globale Kategorien (systemweit)
        ]
      },
      orderBy: { name: 'asc' }
    })
  }

  /**
   * Finde eine Kategorie per ID
   */
  async findByCategoryId(id: number): Promise<Category | null> {
    return prisma.categories.findUnique({
      where: { id }
    })
  }

  /**
   * Neue Kategorie erstellen
   */
  async create(data: Omit<Category, 'id'>): Promise<Category> {
    return prisma.categories.create({
      data
    })
  }

  /**
   * Kategorie aktualisieren
   */
  async update(id: number, data: Partial<Category>): Promise<Category> {
    return prisma.categories.update({
      where: { id },
      data
    })
  }

  /**
   * Kategorie löschen
   */
  async remove(id: number): Promise<boolean> {
    await prisma.categories.delete({
      where: { id }
    })
    return true
  }
}
