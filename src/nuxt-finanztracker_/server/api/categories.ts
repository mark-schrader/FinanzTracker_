import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userId = query.user_id ? Number(query.user_id) : null

  try {
    const categories = await prisma.categories.findMany({
      where: {
        OR: [{ user_id: null }, { user_id: userId }],
      },
      select: {
        id: true,
        name: true,
        type: true,
        icon: true,
        color: true,
      },
      orderBy: { name: 'asc' },
    })

    return categories
  } catch (error) {
    console.error('Fehler beim Abrufen der Kategorien:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Fehler beim Abrufen der Kategorien',
    })
  }
})
