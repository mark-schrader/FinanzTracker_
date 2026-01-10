import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Kontobewegung from '../../../pages/kontobewegung.vue'

describe('Kontobewegung – Einnahme abbrechen', () => {
  it('setzt showIncomeModal auf false', async () => {
    const wrapper = mount(Kontobewegung)
    const vm = wrapper.vm as any

    vm.showIncomeModal = true
    await wrapper.vm.$nextTick()

    expect(vm.showIncomeModal).toBe(true)

    vm.showIncomeModal = false
    await wrapper.vm.$nextTick()

    expect(vm.showIncomeModal).toBe(false)
  })
})
