import { PrismaClient } from "@prisma/client";

export const getExpenses = async (userId: number) => {
  const prisma = new PrismaClient();

  const expenses = await prisma.expenses.findMany({
    where: { user_id: userId },
    select: {
      id: true,
    },
  });

  return expenses;
};
