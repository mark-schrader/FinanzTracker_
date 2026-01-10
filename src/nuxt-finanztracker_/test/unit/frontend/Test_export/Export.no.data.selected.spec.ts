// test/unit/frontend/Test_export/Export.no.data.selected.spec.ts
// Frontend Unit Test – Keine Daten anzeigen


import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'

vi.mock('../../../../composables/useTransactionFilter.js', () => ({
  useTransactionFilter: () => ({
    manualRange: ref(false),
    selectedInterval: ref('all'),
    startDate: ref(''),
    endDate: ref(''),
    clearManualDates: () => {},
    filteredTransactions: ref([]) 
  })
}))

import { shallowMount } from '@vue/test-utils'
import Export from '../../../../pages/export.vue'

describe('Unit: Export – Keine Daten ausgewählt', () => {
  it('zeigt einen Hinweistext, wenn keine Export-Daten vorhanden sind', () => {
    const wrapper = shallowMount(Export, {
      global: { stubs: ['iframe'] }
    })

    // Hinweistext prüfen
    expect(wrapper.text()).toContain(
      'Für den ausgewählten Zeitraum sind keine Daten vorhanden.'
    )
  })
})