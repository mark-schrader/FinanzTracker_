import TransactionController from '../controllers/TransactionController'

export default defineEventHandler(async (event) => {
  // userId später aus Auth oder Query ziehen, aktuell statisch 1:
  const userId = Number(getQuery(event).user_id) || 1

  return await TransactionController.getAll(userId)
})
