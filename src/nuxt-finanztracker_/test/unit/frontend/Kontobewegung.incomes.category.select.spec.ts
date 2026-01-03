import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Kontobewegung from '../../../pages/kontobewegung.vue'

describe('Kontobewegung – Kategorie-Auswahl (Einnahme)', () => {
  it('setzt showIncomeModal auf true', async () => {
    const wrapper = mount(Kontobewegung)
    const vm = wrapper.vm as any

    vm.showIncomeModal = true
    await wrapper.vm.$nextTick()

    expect(vm.showIncomeModal).toBe(true)
  })
})
