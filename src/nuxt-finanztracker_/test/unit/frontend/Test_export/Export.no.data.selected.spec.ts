// test/unit/frontend/Test_export/Export.no.data.selected.spec.ts
// Frontend Unit Test – Keine Daten anzeigen

import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Export from '../../../../pages/export.vue'

describe('Unit: Export – Keine Daten ausgewählt', () => {
    // Test, ob der Hinweis angezeigt wird, wenn keine Daten vorhanden sind
    it('zeigt Hinweis, wenn keine Daten vorhanden sind', () => {
    const wrapper = shallowMount(Export, {
      global: {
        stubs: ['iframe'] 
      }
    })

    // Erwarteter Hinweistext
    expect(wrapper.text()).toContain(
      'Für den ausgewählten Zeitraum sind keine Daten vorhanden.'
    )
  })
})
