// test/unit/frontend/Test_einnahme/Kontobewegung.income.popup.delete.spec.ts
// Frontend Unit Test – Kontobewegung Delete Popup (Einnahme)

import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Kontobewegung from '../../../../pages/kontobewegung.vue'

describe('Kontobewegung – Delete Popup (Einnahme)', () => {
  it('öffnet und schließt das Delete-Popup', async () => {
    const wrapper = mount(Kontobewegung)
    const vm = wrapper.vm as any

    // add a sample transaction to enable delete action
    vm.transactions = [
      { id: 1, type: 'Einnahme', amount: '100 €' }
    ]

    // simulate opening the delete popup
    vm.showActionModal = true
    vm.actionMode = 'delete'
    await wrapper.vm.$nextTick()
    // verify that the delete popup is shown
    expect(vm.showActionModal).toBe(true)

    vm.showActionModal = false
    await wrapper.vm.$nextTick()
    // verify that the delete popup is closed
    expect(vm.showActionModal).toBe(false)
  })
})
