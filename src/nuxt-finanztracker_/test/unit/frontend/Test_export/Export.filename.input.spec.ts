// test/unit/frontend/Test_export/Export.filename.input.spec.ts
// Frontend Unit Test – Dateiname Eingabe

// Export.filename.input.spec.ts
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

describe('Unit: Export – Dateiname Eingabe', () => {
    // Test, ob der Dateiname über das Eingabefeld gesetzt wird
  it('setzt den Dateinamen über das Eingabefeld', async () => {
    const wrapper = shallowMount(Export, {
      global: { stubs: ['iframe'] }
    })

    const input = wrapper.find('input[type="text"]')
    await input.setValue('mein_export')

    expect((wrapper.vm as any).filename).toBe('mein_export')
  })
  // Maxlength Test 50 Zeichen
  it('begrenzt den Dateinamen auf maximal 50 Zeichen', () => {
    const wrapper = shallowMount(Export, {
      global: { stubs: ['iframe'] }
    })

    const input = wrapper.find('input[type="text"]')

    // maxlength 50 prüfen
    expect(input.attributes('maxlength')).toBe('50')
  })
})
