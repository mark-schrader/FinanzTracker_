import { prisma } from '../setup_prisma'
import { TEST_USER_ID } from '../setup.prisma'

export async function cleanupUserData() {
  await prisma.expenses.deleteMany({
    where: { user_id: TEST_USER_ID }
  })

  await prisma.incomes.deleteMany({
    where: { user_id: TEST_USER_ID }
  })

  await prisma.categories.deleteMany({
    where: { user_id: TEST_USER_ID }
  })
}
