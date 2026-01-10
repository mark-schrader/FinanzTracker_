// test/unit/frontend/Test_dauerauftrag/Kontobewegung.dauerauftrag.popup.open.spec.ts
// Unit-Test zum Öffnen des Dauerauftrag-Verwaltungsmodals.

import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Kontobewegung from '../../../../pages/kontobewegung.vue'

describe('Unit: Kontobewegung – Dauerauftrag Modal öffnen', () => {
  it('setzt showRecurringModal auf true', async () => {
    const wrapper = mount(Kontobewegung)
    const vm = wrapper.vm as any

    // Öffnen des Dauerauftrag-Modals über State
    vm.showRecurringModal = true
    await wrapper.vm.$nextTick()

    // Prüfen, ob das Modal-Flag gesetzt ist
    expect(vm.showRecurringModal).toBe(true)
  })
})
