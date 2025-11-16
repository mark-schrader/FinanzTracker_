import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')
  const id = Number(idParam)

  const body = await readBody(event)
  const { recordType, amount, interval, name } = body

  if (!id || !recordType) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing id or recordType'
    })
  }

  if (recordType === 'expense') {
    await prisma.expenses.update({
      where: { id },
      data: {
        amount,
        interval,
        use: name
      }
    })
  } else if (recordType === 'income') {
    await prisma.incomes.update({
      where: { id },
      data: {
        amount,
        interval,
        source: name
      }
    })
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid recordType'
    })
  }

  return { success: true }
})
