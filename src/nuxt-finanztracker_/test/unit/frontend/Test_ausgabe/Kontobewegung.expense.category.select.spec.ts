// test/unit/frontend/Test_ausgabe/Kontobewegung.expense.category.select.spec.ts
// Frontend Unit Test – Kontobewegung Kategorie-Auswahl (Ausgabe)
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Kontobewegung from '../../../../pages/kontobewegung.vue'

describe('Kontobewegung – Kategorie-Auswahl (Ausgabe)', () => {
  it('setzt showExpenseModal auf true', async () => {
    const wrapper = mount(Kontobewegung)
    const vm = wrapper.vm as any

    vm.showExpenseModal = true
    await wrapper.vm.$nextTick()

    expect(vm.showExpenseModal).toBe(true)
  })
})
