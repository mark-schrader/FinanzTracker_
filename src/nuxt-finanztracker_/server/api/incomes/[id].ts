import IncomeService from '../../application/IncomeService'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = Number(getRouterParam(event, 'id'))

  if (!id) throw createError({ statusCode: 400, message: 'Missing income id' })

  try {
    switch (method) {
      case 'PUT': {
        const body = await readBody(event)
        return await IncomeService.updateIncome(id, body)
      }

      case 'DELETE': {
        return await IncomeService.deleteIncome(id)
      }

      default:
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    console.error('[income ID API error]', err)
    throw createError({ statusCode: 500, message: err.message || 'Server error' })
  }
})
