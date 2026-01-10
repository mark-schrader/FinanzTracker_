// test/unit/frontend/Test_export/Export.default.selection.spec.ts
// Frontend Unit Test – Default Export Auswahl

// Export.default.selection.spec.ts
import { describe, it, expect,vi } from 'vitest'
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

describe('Unit: Export – Default Auswahl', () => {
  it('hat standardmäßig "Kontobewegung" und "Alle Daten" ausgewählt', () => {
    const wrapper = shallowMount(Export, {
      global: { stubs: ['iframe'] }
    })

    const vm = wrapper.vm as any

    // Default: Kontobewegung ist aktiviert
    expect(vm.options.kontobewegung).toBe(true)

    // Default: Alle Daten ausgewählt
    expect(vm.selectedInterval).toBe('all')

    // Kein manueller Zeitraum aktiv
    expect(vm.manualRange).toBe(false)
  })
})