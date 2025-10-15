import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  if (event.path !== "/login") {
    const user = await serverSupabaseUser(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    event.context.userId = user.id;
  }
});
