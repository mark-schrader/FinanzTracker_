// test/unit/frontend/Test_dauerauftrag/Kontobewegung.dauerauftrag.popup.edit.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Kontobewegung from '../../../../pages/kontobewegung.vue'

describe('Unit: Kontobewegung – Dauerauftrag Bearbeiten Popup', () => {
  it('öffnet das Bearbeiten-Modal für Dauerauftrag', async () => {
    const wrapper = mount(Kontobewegung)
    const vm = wrapper.vm as any

    // Fake Dauerauftrag 
    vm.transactions = [
      {
        id: 2,
        recordType: 'expense',
        interval: 'monthly',
        amount: '-300 €',
        categoryName: 'Miete'
      }
    ]

    await wrapper.vm.$nextTick() 

    // Rufe die openEdit-Methode auf, um das Bearbeiten Modal zu öffnen
    vm.openEdit(vm.formattedAuftraege[0])
    await wrapper.vm.$nextTick()

    expect(vm.showEditModal).toBe(true) // Prüfe, ob das Modal geöffnet ist
    expect(vm.selectedAuftrag).not.toBeNull() // Prüfe, ob ein Auftrag ausgewählt ist
    expect(vm.selectedAuftrag.id).toBe(2) // Prüfe, ob der richtige Auftrag ausgewählt ist
  })
})
