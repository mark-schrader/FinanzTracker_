import CategoryController from '../controllers/CategoryController'

export default defineEventHandler(async (event) => {
  const userId = Number(getQuery(event).user_id) || 1 // später aus Auth
  return await CategoryController.getAll(userId)
})
