import { PrismaClient } from '@prisma/client'
// Initialize a single instance of PrismaClient to be used throughout the tests
export const prisma = new PrismaClient()
