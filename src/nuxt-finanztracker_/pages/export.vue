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
                <input type="text" v-model="filename" placeholder="kontobewegung_juni_2025" 
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

            <button class="btn-primary h-11" disabled> <!-- Funktion noch nicht implementiert -->
                Exportieren
            </button>
        </div>

        <!-- Exportübersicht -->
        <div class="card text-center">
            <h2 class="mb-4">Exportübersicht</h2>

            <div class="h-48 flex items-center justify-center border-2 border-dashed rounded-lg
               text-gray-400 dark:text-gray-500">
                Vorschau folgt nach Auswahl
            </div>
        </div>
    </div>
</template>

<script setup>
import { useTransactionFilter } from '~/composables/useTransactionFilter'
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

const options = reactive({
    kontobewegung: true,
    dashboard: false,
    challenge: false,
    period: 'month'
})

const filename = ref('')
</script>
