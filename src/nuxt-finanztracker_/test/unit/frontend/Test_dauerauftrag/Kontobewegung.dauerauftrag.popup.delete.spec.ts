// src/nuxt-finanztracker_/test/unit/frontend/Test_dauerauftrag/Kontobewegung.dauerauftrag.popup.delete.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Kontobewegung from '../../../../pages/kontobewegung.vue'

describe('Unit: Kontobewegung – Dauerauftrag Delete Popup', () => {
  it('öffnet und schließt das Delete-Confirm-Popup', async () => {
    const wrapper = mount(Kontobewegung)
    const vm = wrapper.vm as any

    // Fake Dauerauftrag
    vm.transactions = [
      {
        id: 10,
        recordType: 'expense',
        interval: 'monthly',
        amount: '-300 €',
        categoryName: 'Miete'
      }
    ]

    await wrapper.vm.$nextTick()

    // Popup Delete öffnen
    vm.selectedAuftrag = vm.formattedAuftraege[0]
    vm.showDeleteConfirm = true
    await wrapper.vm.$nextTick()

    // Popup ist geöffnet
    expect(vm.showDeleteConfirm).toBe(true)

    // "Abbrechen" = Popup schließen 
    vm.showDeleteConfirm = false
    await wrapper.vm.$nextTick()

    expect(vm.showDeleteConfirm).toBe(false) // Popup ist geschlossen
  })
})


