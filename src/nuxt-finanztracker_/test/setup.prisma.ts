/// <reference types="node" />

import { beforeAll } from 'vitest'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export let TEST_USER_ID: number

const TEST_USER_EMAIL = 'test@local'
const TEST_SUPABASE_ID = 'test-supabase-id'

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

  TEST_USER_ID = user.userid
})
