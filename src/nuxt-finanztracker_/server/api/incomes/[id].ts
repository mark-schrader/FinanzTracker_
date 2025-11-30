import IncomeService from '../../application/IncomeService'

/*
  API-Handler für /api/incomes/:id
  Unterstützte HTTP-Methoden:
    - PUT    -> Ein bestehendes Einkommen aktualisieren
    - DELETE -> Einkommen löschen
  Verwaltet die ID-Validierung, dispatcht die Anfrage ans IncomeService
  und fängt Fehler, die als Serverfehler zurückgemeldet werden.
*/
export default defineEventHandler(async (event) => {
  // Bestimme HTTP-Methode der eingehenden Anfrage
  const method = getMethod(event)

  // Lese die id aus der Route /api/incomes/:id und konvertiere in Number
  const id = Number(getRouterParam(event, 'id'))

  // Validierung: id muss vorhanden und eine positive Zahl sein
  // (Number('abc') => NaN, Number('0') => 0) 
  if (!id) throw createError({ statusCode: 400, message: 'Missing income id' })

  try {
    switch (method) {
      case 'PUT': {
        // PUT: Lese Request-Body (JSON) und rufe Service zum Aktualisieren auf
        const body = await readBody(event)
        return await IncomeService.updateIncome(id, body)
      }

      case 'DELETE': {
        // DELETE: Lösche den Eintrag über den Service
        return await IncomeService.deleteIncome(id)
      }

      default:
        // Nicht erlaubte Methoden werden mit 405 beantwortet
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    // Log und Rückgabe eines generischen Serverfehlers.
    // Genauere Fehlerbehandlung.
    console.error('[income ID API error]', err)
    throw createError({ statusCode: 500, message: err.message || 'Server error' })
  }
})
