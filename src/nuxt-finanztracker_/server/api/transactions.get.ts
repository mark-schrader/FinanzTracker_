import TransactionController from '../controllers/TransactionController'

export default defineEventHandler(async (event) => {
  // Später kannst du hier user_id aus Query oder Auth ziehen
  const userId = getQuery(event).user_id ? Number(getQuery(event).user_id) : null

  return await TransactionController.getAll(userId)
})
