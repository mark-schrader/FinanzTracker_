// utility/recurringUtility.ts

export type Interval = 'once' | 'weekly' | 'monthly' | 'semesterly' | 'annual'

// Funktion zum Hinzufügen von Monaten unter Berücksichtigung von Monatslängen
function addMonths(date: Date, months: number): Date {
  const d = new Date(date.getTime())
  d.setMonth(d.getMonth() + months)
  return d
}

// Fügt dem Datum entsprechend dem Intervall die Zeit hinzu
export function addInterval(date: Date, interval: Interval, times = 1): Date {
  const d = new Date(date.getTime())
  if (interval === 'once') return d

  switch (interval) {
    case 'weekly':
      d.setDate(d.getDate() + 7 * times)
      break
    case 'monthly':
      return addMonths(d, times)
    case 'semesterly':
      return addMonths(d, 6 * times)
    case 'annual':
      d.setFullYear(d.getFullYear() + times)
      break
    default:
      return d
  }

  return d
}

// Prüft, ob das Intervall wiederkehrend ist (nicht 'once' und nicht null oder undefined)
export function isRecurring(interval?: string | null): interval is Interval {
  return !!interval && interval !== 'once'
}

// Berechnet das nächste Datum in der Zukunft basierend auf dem Intervall
export function advanceToNextFuture(date: Date, interval: Interval): Date {
  if (interval === 'once') return new Date(date.getTime())

  let next = new Date(date.getTime())
  const now = new Date()
  // Sicherheitsabfrage, um endlose Schleifen zu vermeiden
  let safety = 0
  while (next <= now && safety < 1000) {
    next = addInterval(next, interval, 1)
    safety++
  }
  return next
}

// Hilfsfunktion zum Konvertieren von Werten in Date-Objekte
export function toDate(val: any): Date | undefined {
  if (val === undefined || val === null) return undefined
  const d = val instanceof Date ? val : new Date(val)
  if (isNaN(d.getTime())) return undefined
  return d
}

export default {
  addInterval,
  advanceToNextFuture,
  isRecurring,
  toDate
}
