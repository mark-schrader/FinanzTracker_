// ...existing code...
import ExpenseService from './ExpenseService'
import IncomeService from './IncomeService'

export default class TransactionService {
  /**
   * Liefert kombinierte, formatierte Transaktionen (Einnahmen + Ausgaben),
   * sortiert nach Datum (neu -> alt).
   */
  static async getAllTransactions(userId: number) {
    if (!userId) throw new Error('Missing userId')

    // Parallel alle Ausgaben und Einnahmen abfragen (besser Performance als nacheinander)
    const [expenses, incomes] = await Promise.all([
      ExpenseService.getExpensesByUserId(Number(userId)),
      IncomeService.getIncomesByUserId(Number(userId))
    ])

    // Ausgaben in das einheitliche Response-Format transformieren
    const formattedExpenses = (expenses || []).map((exp: any) => ({
      id: exp.id, // ID der Ausgabe, um ggf. darauf zugreifen zu können                            
      recordType: 'expense',  // Kennzeichnung als Ausgabe 
      // type hilft dem Frontend, Einträge zu unterscheiden
      type: 'Ausgabe', 
      // formattedDate / formattedAmount sind Getter in den Domain-Objekten
      date: exp.formattedDate,
      // Zeit ist aktuell nicht separat vorhanden => Platzhalter
      time: '—',
      // formatierter Betrag mit Minuszeichen
      amount: exp.formattedAmount,
      // Intervall (z.B. einmalig, monatlich)
      interval: exp.interval,
      // Besitzer / Benutzername falls geladen, sonst Fallback
      owner: exp.user?.username ?? 'Unbekannt',
      // Kategorie-Name, falls Relation geladen
      // alt: category: exp.categories?.name ?? '',
      categoryName: exp.categories?.name ?? "—",
      categoryId: exp.categories?.id ?? null,

      
      // Zweck/Verwendungsfeld der Ausgabe
      purpose: exp.use,
      // Kommentar / Notiz
      comment: exp.note ?? '',
      // rohes Datum bleibt für die Sortierung erhalten (wird später entfernt)
      rawDate: exp.date
    }))

    // Einnahmen in das gleiche Format transformieren
    const formattedIncomes = (incomes || []).map((inc: any) => ({
      id: inc.id, // ID der Einnahme, um ggf. darauf zugreifen zu können
      recordType: 'income', // Kennzeichnung als Einnahme
      type: 'Einnahme',
      date: inc.formattedDate,
      time: '—',
      amount: inc.formattedAmount,
      interval: inc.interval,
      owner: inc.user?.username ?? 'Unbekannt',
      //alt: category: inc.categories?.name ?? '',
      categoryName: inc.categories?.name ?? "—",
      categoryId: inc.categories?.id ?? null,

      // Quelle der Einnahme
      purpose: inc.source,
      comment: inc.note ?? '',
      rawDate: inc.date
    }))

    // Zusammenführen, nach rawDate absteigend sortieren und Hilfsfeld entfernen
    return [...formattedExpenses, ...formattedIncomes]
      .sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime())
      .map(({ rawDate, ...rest }) => rest) // rawDate ist nur für die Sortierung nötig
  }
}