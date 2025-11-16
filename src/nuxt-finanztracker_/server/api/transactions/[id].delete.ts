import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')
  const id = Number(idParam)

  const body = await readBody(event)
  const recordType = body?.recordType

  if (!id || !recordType) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing id or recordType'
    })
  }

  if (recordType === 'expense') {
    await prisma.expenses.delete({ where: { id } })
  } else if (recordType === 'income') {
    await prisma.incomes.delete({ where: { id } })
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid recordType'
    })
  }

  return { success: true }
})
