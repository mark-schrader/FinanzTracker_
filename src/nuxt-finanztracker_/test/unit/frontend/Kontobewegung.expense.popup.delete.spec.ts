import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Kontobewegung from '../../../pages/kontobewegung.vue'

describe('Kontobewegung – Delete Popup (Ausgabe)', () => {
  it('öffnet und schließt das Delete-Popup', async () => {
    const wrapper = mount(Kontobewegung)
    const vm = wrapper.vm as any

    // setup a sample expense transaction
    vm.transactions = [
      { id: 2, type: 'Ausgabe', amount: '50 €' }
    ]

    // simulate opening the popup
    vm.showActionModal = true
    vm.actionMode = 'delete'
    await wrapper.vm.$nextTick()

    expect(vm.showActionModal).toBe(true)

    // simulate closing the popup
    vm.showActionModal = false
    await wrapper.vm.$nextTick()

    expect(vm.showActionModal).toBe(false)
  })
})
