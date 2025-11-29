// server/api/user/create.ts

import { serverSupabase } from '~/server/utils/supabase'
import { PrismaClient } from '@prisma/client'
import { readBody } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password, ...profile } = body


  const { data, error } = await serverSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })
  
  if (error || !data.user) {
    throw createError({ statusCode: 400, statusMessage: error?.message || 'Anmeldung fehlgeschlagen!' })
  }
  console.log('Supabase user:', data.user)

  const user = await prisma.user.create({
    data: {
      supabaseid: data.user.id,
      firstname: body.firstname,
      lastname: body.lastname,
      university: body.university,
      birthdate: new Date(body.birthdate),
      //startamount: body.startamount,
      //username: body.username,
      email: body.email,
      
    
    }
  })
  // BigInt zu String konvertieren
const userSafe = {
  userid: user.userid.toString(),
}

  return {
    user: userSafe, 
    status: 'success', 
    message: 'Account erfolgreich erstellt' }
})
