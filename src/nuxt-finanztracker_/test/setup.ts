// test/setup.ts
import './setup.frontend'

// Only initialize Prisma for backend / integration tests
if (
  process.env.DATABASE_URL &&
  (process.env.VITEST_MODE === 'backend' ||
   process.env.VITEST_MODE === 'integration')
) {
  await import('./setup.prisma')
}
