import ExpenseController from '../controllers/ExpenseController'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await ExpenseController.create(body)
})
