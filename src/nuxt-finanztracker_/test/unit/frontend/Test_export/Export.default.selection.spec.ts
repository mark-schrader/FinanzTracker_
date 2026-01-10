// test/unit/frontend/Test_export/Export.default.selection.spec.ts
// Frontend Unit Test – Default Export Auswahl

import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Export from '../../../../pages/export.vue'

describe('Unit: Export – Default Auswahl', () => {
  it('setzt standardmäßig Kontobewegung und Alle Daten', () => {
    const wrapper = shallowMount(Export, {
      global: {
        stubs: ['iframe']
      }
    })

    const vm = wrapper.vm as any

    // Default Checkbox Kontobewegung
    expect(vm.options.kontobewegung).toBe(true)

    // Default Zeitraum Alle Daten
    expect(vm.selectedInterval).toBe('all')
  })
})
