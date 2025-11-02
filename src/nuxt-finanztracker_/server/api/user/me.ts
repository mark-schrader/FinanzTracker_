import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  
  const supabaseUser = await serverSupabaseUser(event)

  if (!supabaseUser) {
    
    throw createError({
      statusCode: 401,
      statusMessage: 'Nicht autorisiert',
    })
  }

  // Finde den zugehörigen Prisma-User in Ihrer Datenbank
  const prismaUser = await prisma.user.findUnique({
    where: {
      supabaseid: supabaseUser.id,
    }
  })

  if (!prismaUser) {
    // Der User ist in Supabase Auth, aber nicht in Ihrer Prisma-DB?
    throw createError({
      statusCode: 404,
      statusMessage: 'User-Profil nicht gefunden',
    })
  }

  // 3. Gebe die benötigten Daten (insbesondere die Prisma-userid) zurück
  return {
    userid: prismaUser.userid.toString(),
    //email: prismaUser.email,
    //firstname: prismaUser.firstname
  }
})