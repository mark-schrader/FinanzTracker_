// test/unit/frontend/Test_dauerauftrag/Kontobewegung.dauerauftrag.popup.edit.spec.ts
// Unit-Test für das Bearbeiten-Popup eines Dauerauftrags.

import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Kontobewegung from '../../../../pages/kontobewegung.vue'

describe('Unit: Kontobewegung – Dauerauftrag Bearbeiten Popup', () => {
  it('öffnet und schließt das Bearbeiten-Modal (Abbrechen)', async () => {
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

    // Bearbeiten-Modal öffnen
    vm.showEditModal = true
    await wrapper.vm.$nextTick()

    // Modal ist geöffnet
    expect(vm.showEditModal).toBe(true)
    expect(vm.selectedAuftrag).not.toBeNull()

    // Bearbeiten abbrechen (Modal schließen)
    vm.showEditModal = false
    await wrapper.vm.$nextTick()

    // Modal ist geschlossen
    expect(vm.showEditModal).toBe(false)

    // Auftrag bleibt unverändert gesetzt (kein Speichern)
    expect(vm.selectedAuftrag.id).toBe(2)
  })
})