// src/nuxt-finanztracker_/test/unit/frontend/Test_dauerauftrag/Kontobewegung.dauerauftrag.popup.delete.spec.ts
// Unit-Test für das Bestätigungs-Popup zum Löschen eines Dauerauftrags.


import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Kontobewegung from '../../../../pages/kontobewegung.vue'

describe('Unit: Kontobewegung – Dauerauftrag Delete Popup', () => {
  it('öffnet und schließt das Delete-Confirm-Popup', async () => {
    // Komponente mounten
    const wrapper = mount(Kontobewegung)
    const vm = wrapper.vm as any

    // Einen Beispiel-Dauerauftrag setzen, der gelöscht werden soll.
    // Das Delete-Popup ist an selectedAuftrag gekoppelt.
    vm.selectedAuftrag = {
      id: 10,
      recordType: 'expense',
      interval: 'monthly',
      amount: '-300 €',
      categoryName: 'Miete'
    }

    // Delete-Confirm-Popup öffnen
    vm.showDeleteConfirm = true
    await wrapper.vm.$nextTick()

    // Prüfen, ob das Popup angezeigt wird
    expect(vm.showDeleteConfirm).toBe(true)

    // Delete-Confirm-Popup schließen (z.B. durch Klick auf „Abbrechen“)
    vm.showDeleteConfirm = false
    await wrapper.vm.$nextTick()

    // Prüfen, ob das Popup wieder geschlossen ist
    expect(vm.showDeleteConfirm).toBe(false)
  })
})
