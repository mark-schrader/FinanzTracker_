import { ref, computed } from 'vue'

export function useTransactionFilter(transactions) {

  // Filter- und Datumssteuerung
  const manualRange = ref(false) // Checkbox
  const selectedInterval = ref("all")

  const startDate = ref(null)
  const endDate = ref(null)

  function clearManualDates() {
    startDate.value = null
    endDate.value = null
  }

  // Gefilterte Transaktionen basierend auf Auswahl
  const filteredTransactions = computed(() => {
    const all = transactions.value

    // manuelle Datumsauswahl
    if (manualRange.value) {
      return all.filter(t => {
        const d = new Date(t.date)

        if (startDate.value && d < new Date(startDate.value)) return false
        if (endDate.value && d > new Date(endDate.value)) return false
        return true
      })
    }

    // Auswahl vordefinierter Intervalle
    const now = new Date()
    let cutoff = null

    switch (selectedInterval.value) {
      case "week":
        cutoff = new Date(now)
        cutoff.setDate(now.getDate() - 7)
        break
      case "month":
        cutoff = new Date(now)
        cutoff.setMonth(now.getMonth() - 1)
        break
      case "semester":
        cutoff = new Date(now)
        cutoff.setMonth(now.getMonth() - 6)
        break
      case "year":
        cutoff = new Date(now)
        cutoff.setFullYear(now.getFullYear() - 1)
        break
      case "all":
      default:
        return all
    }

    return all.filter(t => new Date(t.date) >= cutoff)

  })

  return {
    manualRange,
    selectedInterval,
    startDate,
    endDate,
    clearManualDates,
    filteredTransactions
  }
}
