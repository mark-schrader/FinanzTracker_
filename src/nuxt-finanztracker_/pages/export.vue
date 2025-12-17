<template>
    <div class="page-wrapper space-y-8">
        <!-- Title -->
        <h1>Export</h1>
        <!-- Export Optionen -->
        <div class="flex flex-col md:flex-row gap-6 mb-6">
            <!-- Auswahl daten -->
            <div class="card flex flex-col gap-4 flex-1 min-w-0 bg-gray-100 dark:bg-gray-800">
                <h3>Auswahl Daten</h3>

                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="options.kontobewegung" />
                    Kontobewegung
                </label>

                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="options.dashboard" />
                    Dashboard
                </label>

                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="options.challenge" />
                    Challenge
                </label>
            </div>
            <!-- Zeitraum Auswahl, wie im Dashboard -->
            <div class="card flex flex-col gap-4 flex-1 min-w-0 bg-gray-100 dark:bg-gray-800">
                <h3>Zeitraum</h3>

                <!-- Benutzer definiert Zeitraum selbst -->
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="manualRange" />
                    Zeitraum genau bestimmen
                </label>

                <!-- Dropdown für Intervall -->
                <div v-if="!manualRange"
                    class="flex items-center gap-3 border-2 border-brand-300 dark:border-brand-600 rounded w-48">
                    <select v-model="selectedInterval" class="form-select w-48">
                        <option value="all">Alle Daten</option>
                        <option value="week">Woche</option>
                        <option value="month">Monat</option>
                        <option value="semester">Semester</option>
                        <option value="year">Jahr</option>
                    </select>
                </div>

                <!-- Manuelle Datumsauswahl -->
                <div v-else class="flex flex-wrap gap-4">
                    <div class="flex flex-col">
                        <label class="mb-1">Startdatum</label>
                        <input type="date" v-model="startDate" class="form-input" />
                    </div>

                    <div class="flex flex-col">
                        <label class="mb-1">Enddatum</label>
                        <input type="date" v-model="endDate" class="form-input" />
                    </div>

                    <button @click="clearManualDates" class="btn-primary mt-6">
                        Reset
                    </button>
                </div>
            </div>


        </div>


        <!-- Export Optionen -->
        <div class="card grid md:grid-cols-3 gap-4 items-end">
            <div>
                <label class="block mb-1">Dateiname</label>
                <input type="text" v-model="filename" placeholder="z.B. kontobewegung_juni_2025"
                    class="form-input border-2 border-brand-300 dark:border-brand-600" />
            </div>

            <div>
                <label class="block mb-1">Dateityp</label>
                <select class="form-select border-2 border-brand-300 dark:border-brand-600">
                    <option>PDF (.pdf)</option>
                    <option>CSV (.csv)</option>
                    <option>Excel (.xlsx)</option>
                    <option>Json (.json)</option>
                </select>
            </div>
            <!-- Export Button -->
            <button class="btn-primary h-11" :disabled="!options.kontobewegung || exportTransactions.length === 0"
                @click="exportPdf(true)">
                Exportieren
            </button>

        </div>

        <!-- Exportübersicht -->
        <div class="card">
            <div class="flex items-center justify-between mb-4">
                <h3>Exportübersicht</h3>
                <!-- PDF herunterladen button-->
                <button v-if="pdfPreviewUrl" class="btn-primary" @click="downloadPdf">
                    PDF herunterladen
                </button>
            </div>

            <!-- wenn keine Daten -->
            <div v-if="exportTransactions.length === 0" class="h-32 flex items-center justify-center
           border-2 border-dashed rounded-lg
           text-red-500 text-sm">
                Für den ausgewählten Zeitraum sind keine Daten vorhanden.
            </div>

            <!-- Placeholder -->
            <div v-else-if="!pdfPreviewUrl" class="h-48 flex items-center justify-center
           border-2 border-dashed rounded-lg
           text-gray-400 dark:text-gray-500">
                Vorschau wird nach dem Export angezeigt
            </div>

            <!-- Vorschau/preview -->
            <div v-else>
                <div class="text-sm mb-4">
                    <p>
                        <strong>Summe Einnahmen:</strong>
                        {{ exportSummary.income.toLocaleString('de-DE', { minimumFractionDigits: 2 }) }} €
                    </p>
                    <p>
                        <strong>Summe Ausgaben:</strong>
                        {{ exportSummary.expense.toLocaleString('de-DE', { minimumFractionDigits: 2 }) }} €
                    </p>
                    <p class="font-semibold">
                        <strong>Saldo:</strong>
                        {{ exportSummary.saldo.toLocaleString('de-DE', { minimumFractionDigits: 2 }) }} €
                    </p>
                </div>

                <iframe :src="pdfPreviewUrl" class="w-full h-96 border rounded" />
            </div>
        </div>

    </div>
</template>

<script setup>
import { useTransactionFilter } from '~/composables/useTransactionFilter'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


const transactions = ref([])
// Filter Zeitraum & Logik (useTransactionFilter composable)
const {
    manualRange,
    selectedInterval,
    startDate,
    endDate,
    clearManualDates,
    filteredTransactions
} = useTransactionFilter(transactions)

// Lade alle Kontobewegungen vom Nutzer 
onMounted(async () => {
    const data = await $fetch('/api/transactions?userId=1')
    transactions.value = data || []
})

// Lösche Blob URL wenn Komponente zerstört wird
onBeforeUnmount(() => {
    if (pdfPreviewUrl.value) URL.revokeObjectURL(pdfPreviewUrl.value)
})

// Gefilterte Transaktionen für den Export (nur bis heute)
const exportTransactions = computed(() => {
    const now = new Date()
    now.setHours(23, 59, 59, 999)

    return filteredTransactions.value.filter(t => {
        const d = new Date(t.date)
        d.setHours(0, 0, 0, 0)
        return d <= now
    })
})

// Export Zusammenfassung mit Saldo
const exportSummary = computed(() => {
    let income = 0
    let expense = 0

    exportTransactions.value.forEach(t => {
        const amount =
            Number(String(t.amount).replace(/[^0-9.-]/g, '')) || 0

        if (t.type === 'Einnahme') income += amount
        if (t.type === 'Ausgabe') expense += Math.abs(amount)
    })

    return {
        income,
        expense,
        saldo: income - expense
    }
})

// Export Optionen aber erstmal nur Kontobewegung
const options = reactive({
    kontobewegung: true, // exportiere Kontobewegung
    dashboard: false, // erstmal kein Dashboard Export
    challenge: false, // erstmal kein Challenge Export
})

const filename = ref('') // Dateiname für Export von Nutzer definiert, wenn leer, Standardname verwenden

const pdfPreviewUrl = ref(null) // Vorschau URL für PDF Export (Data URL oder Blob URL)


// Erstmal nur PDF Export Funktion
function exportPdf(preview = false) {
    if (!options.kontobewegung || exportTransactions.value.length === 0) return

    const doc = new jsPDF('p', 'mm', 'a4') // Portrait, mm, A4

    // Titel oben links
    doc.setFontSize(16)
    doc.text('Kontobewegung', 14, 20)

    // Zeitraum Text unter Titel
    doc.setFontSize(10)
    let periodText = ''

    // Je nach Auswahl Zeitraum Text generieren
    if (manualRange.value) {
        periodText = `Zeitraum: ${startDate.value} – ${endDate.value}`
    } else {
        const map = {
            all: 'Alle Daten',
            week: 'Woche',
            month: 'Monat',
            semester: 'Semester',
            year: 'Jahr'
        }
        periodText = `Zeitraum: ${map[selectedInterval.value]}`
    }

    doc.text(periodText, 14, 28)

    // Tabelle 
    // Daten vorbereiten, jede Zeile ein Array mit Spaltenwerten
    const rows = exportTransactions.value.map(t => {
        const amountNumber =
            Number(String(t.amount).replace(/[^0-9.-]/g, '')) || 0 // Betrag als Zahl

        const isIncome = t.type === 'Einnahme' // true wenn Einnahme, false wenn Ausgabe

        const formatted = Math.abs(amountNumber).toLocaleString('de-DE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })

        return [
            t.date || '—', // Datum
            t.source || t.use || t.purpose || '—', // Beschreibung
            isIncome ? formatted : '', // Einnahme
            !isIncome ? formatted : '' // Ausgabe
        ]
    })
    // Tabelle mit autoTable erstellen
    autoTable(doc, {
        startY: 35,
        head: [['Datum', 'Beschreibung', 'Einnahme (€)', 'Ausgabe (€)']],
        body: rows,

        styles: {
            fontSize: 9,
            cellPadding: 2
        },

        headStyles: {
            fillColor: [20, 184, 166],
            textColor: 255,
            fontStyle: 'bold',
            halign: 'left'
        },

        columnStyles: {
            0: { cellWidth: 30, halign: 'left' }, // Datum
            1: { cellWidth: 70, halign: 'left' }, // Beschreibung
            2: { cellWidth: 40, halign: 'right', font: 'courier' }, // Einnahme
            3: { cellWidth: 40, halign: 'right', font: 'courier' } // Ausgabe
        },

        didParseCell(data) { // Zellenanpassungen
            if (
                data.section === 'head' && //Kopfzeile
                (data.column.index === 2 || data.column.index === 3)
            ) {
                data.cell.styles.halign = 'right'
            }
        },

        // Fußzeile mit Seitenzahl und Copyright Pleitegeier
        didDrawPage() {
            const pageHeight = doc.internal.pageSize.height // Seitenhöhe, für Fußzeile
            const pageNumber = doc.getNumberOfPages() // Aktuelle Seitenzahl
            doc.setFontSize(8) // Fußzeile Schriftgröße
            doc.setTextColor(0) // Fußzeile Schriftfarbe, schwarz

            doc.text(
                // Fußzeile links, Copyright + Seitenzahl 
                `© ${new Date().getFullYear()} Pleitegeier – Seite ${pageNumber} / ${doc.getNumberOfPages()}`,
                doc.internal.pageSize.width / 2,
                pageHeight - 10,
                { align: 'center' }
            )
        }

    })

    // Summen & Saldo 
    const finalY = doc.lastAutoTable.finalY + 8
    doc.setFontSize(10)

    doc.text(
        `Summe Einnahmen: ${exportSummary.value.income.toLocaleString('de-DE', {
            minimumFractionDigits: 2
        })} €`,
        14,
        finalY
    )

    doc.text(
        `Summe Ausgaben: ${exportSummary.value.expense.toLocaleString('de-DE', {
            minimumFractionDigits: 2
        })} €`,
        14,
        finalY + 6
    )

    doc.setFont(undefined, 'bold')
    doc.text(
        `Saldo: ${exportSummary.value.saldo.toLocaleString('de-DE', {
            minimumFractionDigits: 2
        })} €`,
        14,
        finalY + 14
    )
    doc.setFont(undefined, 'normal')


    // exportPdf Funktion, true für Preview, false für Download
    if (preview) { // wenn preview true ist
        // Preview generieren als Blob URL
        if (pdfPreviewUrl.value) URL.revokeObjectURL(pdfPreviewUrl.value)
        const blob = doc.output('blob')
        pdfPreviewUrl.value = URL.createObjectURL(blob)
    }
    else { // wenn preview false ist, Datei herunterladen
        const today = new Date().toISOString().slice(0, 10)
        const name = filename.value?.trim()
            ? filename.value
            : `kontobewegung_${today}`

        doc.save(`${name}.pdf`)
    }
}

function downloadPdf() {
    exportPdf(false)
}

</script>
