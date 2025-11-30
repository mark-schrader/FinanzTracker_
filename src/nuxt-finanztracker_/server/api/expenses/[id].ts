import ExpenseService from '../../application/ExpenseService'

/*
  API-Handler für die Route: /api/expenses/:id
  Unterstützte HTTP-Methoden:
    - PUT    -> Ein bestehendes Expense aktualisieren
    - DELETE -> Expense löschen
*/
export default defineEventHandler(async (event) => {
  // Bestimme HTTP-Methode der Anfrage
  const method = getMethod(event)
  // Lese die Route-Parameter 'id' und wandle in Number um
  // Number('abc') => NaN, Number('0') => 0
  const id = Number(getRouterParam(event, 'id'))

  // Validierung: id muss vorhanden und größer als 0 sein
  // Andernfalls 400 Bad Request zurückgeben
  if (!id) throw createError({ statusCode: 400, message: 'Missing expense id' })

  try {
    // Dispatch basierend auf HTTP-Methode
    switch (method) {
      case 'PUT': {
        // PUT: Request-Body einlesen (JSON) und Service zum Aktualisieren aufrufen
        const body = await readBody(event)
        return await ExpenseService.updateExpense(id, body)
      }

      case 'DELETE': {
        // DELETE: Expense über Service löschen
        return await ExpenseService.deleteExpense(id)
      }

      default:
        // Alle anderen Methoden sind nicht erlaubt -> 405 Method Not Allowed
        throw createError({ statusCode: 405, message: `Method ${method} not allowed` })
    }
  } catch (err: any) {
    // Fehler im Service oder während der Verarbeitung abfangen
    // Logging für Debugging; die Client-Antwort enthält einen generischen 500er-Fehler
    console.error('[expense ID API error]', err)
    throw createError({ statusCode: 500, message: err.message || 'Server error' })
  }
})
