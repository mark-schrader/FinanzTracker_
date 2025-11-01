// server/api/user/create.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { z } from "zod";

const userSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  university: z.string().min(1),
  birthdate: z.string().min(1), // ISO Datum als String
  startamount: z.number().min(0),
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(6), // In der Praxis sollte das Passwort gehasht werden
});

export default defineEventHandler(async (event) => {
  const { data, success } = await readValidatedBody(
    event,
    userSchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Ungültige Benutzerdaten",
    });
  }

  const user = await prisma.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      university: data.university,
      birthdate: new Date(data.birthdate),
      startamount: data.startamount,
      username: data.username,
      email: data.email,
      password: data.password,
    },
  });

  return user;
});
