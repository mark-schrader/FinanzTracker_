import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'
import CategoryService from "../application/CategoryService";
import { QueryUserIdSchema } from "../utility/validationUtility";
import { z } from "zod";

// Schema zum Validieren des Request-Bodys für das Erstellen einer Kategorie
const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(1)
    .refine((val) => !val.startsWith(" "), {
      message: "Name darf nicht mit einem Leerzeichen beginnen",
    }),
  type: z.string().min(1),
  userId: z.preprocess((val) => {
    if (val === undefined || val === null) return undefined;
    return Number(val);
  }, z.number().int().positive().optional()),
  icon: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
});

// Handler für die API-Endpunkte
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  
  const method = getMethod(event)

  const supabaseUser = await serverSupabaseUser(event)

  console.log('--- DEBUG START ---')
  console.log('Ganzer User:', supabaseUser)
  console.log('Die ID ist:', supabaseUser?.id)
  console.log('--- DEBUG END ---')

  if (!supabaseUser) {
    throw createError({ statusCode: 401, message: 'Nicht Authorisiert!' })
  } 

  const prismaUser = await prisma.user.findUnique({
    where: { supabaseid: supabaseUser.id }
  })  
  if (!prismaUser) {
    throw createError({ statusCode: 401, message: 'Benutzer nicht gefunden!' })
  }

  const userId = prismaUser.userid

  try {
    // Behandeln der verschiedenen Anfragen-Methoden
    switch (method) {
      case 'GET': // GET /api/categories?userId=1
        
        return await CategoryService.getCategoryByUserId(Number(userId)) // Ausgabe der Kategorien für den angegebenen Benutzer

      case "POST": {
        // POST /api/categories
        const body = await readBody(event);
        const parsed = CreateCategorySchema.safeParse(body);
        if (!parsed.success) {
          const err = parsed.error;
          throw createError({
            statusCode: 400,
            message: `Invalid body: ${JSON.stringify(err.errors)}`,
          });
        }

        const payload: any = {
          name: parsed.data.name,
          type: parsed.data.type,
          userId: userId,
          icon: parsed.data.icon ?? null,
          color: parsed.data.color ?? null,
        };

        return await CategoryService.createCategory(payload); // Erstellung einer neuen Kategorie
      }

      default:
        throw createError({
          statusCode: 405,
          message: `Method ${method} not allowed`,
        });
    }
  } catch (err: any) {
    console.error("[categories API error]", err);
    throw createError({
      statusCode: err.statusCode ?? 500,
      message: err.message || "Server error",
    });
  }
});
