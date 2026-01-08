// reference types="node" used to fix type issues with process.env
/// <reference types="node" />
// Setup Prisma Client for testing environment
import { beforeAll } from 'vitest'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export let TEST_USER_ID: number
// Use VITEST_WORKER_ID to create unique test data per worker
const WORKER_ID = process.env.VITEST_WORKER_ID ?? '0'
// Define unique test user credentials
const TEST_USER_EMAIL = `test-${WORKER_ID}@local`
const TEST_SUPABASE_ID = `test-supabase-${WORKER_ID}`
// Create or retrieve the test user before all tests run
beforeAll(async () => {
  console.log('TEST DB:', process.env.DATABASE_URL)

  const user = await prisma.user.upsert({
    where: { email: TEST_USER_EMAIL },
    update: {},
    create: {
      email: TEST_USER_EMAIL,
      firstname: 'Test',
      lastname: 'User',
      university: 'Test Uni',
      birthdate: new Date('2000-01-01'),
      supabaseid: TEST_SUPABASE_ID,
    },
  })
// Store the user ID for use in tests
  TEST_USER_ID = user.userid
})
