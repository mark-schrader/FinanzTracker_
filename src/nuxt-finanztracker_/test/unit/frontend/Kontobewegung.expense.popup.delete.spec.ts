// src/nuxt-finanztracker_/test/unit/frontend/Kontobewegung.income.popup.delete.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Kontobewegung from '../../../pages/kontobewegung.vue'

describe('Unit: Kontobewegung – Expense Delete Popup', () => {
  it('öffnet das Delete-Popup und schließt es beim Abbrechen', async () => {
    const wrapper = mount(Kontobewegung, {
      global: {
        stubs: {
          // Child-Component mocken
          bewegungstabelle_aktion: {
            template: `
              <div data-testid="delete-popup">
                <button data-testid="cancel" @click="$emit('close')" />
              </div>
            `
          }
        }
      }
    })

    // Fake Expense-Transaktion setzen
    ;(wrapper.vm as any).transactions = [
      {
        id: 2,
        type: 'Ausgabe',
        amount: '-50 €'
      }
    ]

    // Löschvorgang starten
    ;(wrapper.vm as any).handleDelete(2)
    await wrapper.vm.$nextTick()

    // Popup ist geöffnet
    expect((wrapper.vm as any).showActionModal).toBe(true)
    expect((wrapper.vm as any).actionMode).toBe('delete')

    // Abbrechen im Popup auslösen (Event!)
    await wrapper.find('[data-testid="cancel"]').trigger('click')

    // Popup ist geschlossen
    expect((wrapper.vm as any).showActionModal).toBe(false)
  })
})
