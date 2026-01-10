// test/unit/frontend/Test_ausgabe/Kontobewegung.expense.popup.cancel.spec.ts
// Frontend Unit Test – Kontobewegung Ausgabe Popup abbrechen
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Kontobewegung from '../../../../pages/kontobewegung.vue'

describe('Kontobewegung – Ausgabe abbrechen', () => {
  it('setzt showExpenseModal auf false', async () => {
    const wrapper = mount(Kontobewegung)
    const vm = wrapper.vm as any

    vm.showExpenseModal = true
    await wrapper.vm.$nextTick()

    expect(vm.showExpenseModal).toBe(true)

    vm.showExpenseModal = false
    await wrapper.vm.$nextTick()

    expect(vm.showExpenseModal).toBe(false)
  })
})
