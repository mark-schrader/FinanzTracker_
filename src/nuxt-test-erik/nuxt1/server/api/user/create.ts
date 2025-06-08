
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user = await prisma.user.create({
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
      university: body.university,
      birthdate: new Date(body.birthdate),
      startamount: body.startamount,
      username: body.username,
      email: body.email,
      password: body.password 
    }
  })

  return user
})