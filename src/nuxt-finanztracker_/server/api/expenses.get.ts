// server/api/expenses.get.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const userId = event.context.userId;

  const expenses = await prisma.expenses.findMany({
    where: { user_id: BigInt(userId) },
    include: {
      categories: true,
      user: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return expenses.map((exp) => ({
    date: exp.date.toISOString().split("T")[0],
    time: "—", // Zeit ist nicht im Schema, ggf. aus `created_at` extrahieren
    amount: `-${exp.amount.toFixed(2)} €`,
    owner: exp.user.username,
    category: exp.categories.name,
    comment: exp.note || "",
  }));
});
