// test/unit/frontend/Test_dauerauftrag/Kontobewegung.dauerauftrag.popup.edit.spec.ts
// Unit-Test für das Bearbeiten-Popup eines Dauerauftrags.

import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Kontobewegung from '../../../../pages/kontobewegung.vue'

describe('Unit: Kontobewegung – Dauerauftrag Bearbeiten Popup', () => {
  it('öffnet das Bearbeiten-Modal für einen Dauerauftrag', async () => {
    const wrapper = mount(Kontobewegung)
    const vm = wrapper.vm as any

    // Fake ausgewählter Dauerauftrag
    vm.selectedAuftrag = {
      id: 2,
      recordType: 'expense',
      name: 'Miete',
      betrag: 300,
      intervall: 'monthly',
      categoryId: 1,
      categoryName: 'Miete',
      note: '',
      date: '2025-01-01'
    }

    // Edit-Modal öffnen 
    vm.showEditModal = true
    await wrapper.vm.$nextTick()

    // Assertions
    expect(vm.showEditModal).toBe(true)
    expect(vm.selectedAuftrag).not.toBeNull()
    expect(vm.selectedAuftrag.id).toBe(2)
    expect(vm.selectedAuftrag.intervall).toBe('monthly')
  })
})
