// setup.prisma.ts
/// <reference types="node" />
// This file sets up a test user in the database before all tests run
// and provides a Prisma client instance for database interactions.
import { beforeAll, afterAll } from 'vitest'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export let TEST_USER_ID: number

// Make email unique per test run to avoid collisions (local + CI)
const RUN_ID =
  process.env.GITHUB_RUN_ID ??
  process.env.VITEST_POOL_ID ??
  process.env.VITEST_WORKER_ID ??
  `${Date.now()}`

const TEST_USER_EMAIL = `test-${RUN_ID}@local`
const TEST_SUPABASE_ID = `test-supabase-${RUN_ID}`

beforeAll(async () => {
  console.log('TEST DB:', process.env.DATABASE_URL)

  // Robust "find or create" to avoid race conditions
  const existing = await prisma.user.findUnique({
    where: { email: TEST_USER_EMAIL },
  })

  const user =
    existing ??
    (await prisma.user.create({
      data: {
        email: TEST_USER_EMAIL,
        firstname: 'Test',
        lastname: 'User',
        university: 'Test Uni',
        birthdate: new Date('2000-01-01'),
        supabaseid: TEST_SUPABASE_ID,
        // createdAt is default(now()) in schema
      },
    }))

  TEST_USER_ID = user.userid
})

afterAll(async () => {
  await prisma.$disconnect()
})
