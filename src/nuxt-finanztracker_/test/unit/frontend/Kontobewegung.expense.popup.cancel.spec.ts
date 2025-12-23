// test/unit/frontend/Kontobewegung.expense.popup.cancel.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Kontobewegung from '../../../pages/kontobewegung.vue'

const factory = () =>
  mount(Kontobewegung, {
    global: {
      stubs: {
        CurrentTime: true,
        InlineAlert: true,
        categoryManager: true,
        bewegungstabelle: true,
        bewegungstabelle_aktion: true
      }
    }
  })

  describe('Eingabe abbrechen (Ausgabe)', () => {
  it('schließt das Ausgabe-Modal beim Klick auf Abbrechen', async () => {
    const wrapper = factory()

    // Modal öffnen
    ;(wrapper.vm as any).showExpenseModal = true
    await wrapper.vm.$nextTick()

    // Sicherstellen: Modal ist sichtbar
    expect(wrapper.html()).toContain('Neue Ausgabe')
    // Abbrechen-Button klicken
    const cancelButton = wrapper
      .findAll('button')
      .find(b => b.text() === 'Abbrechen')

    expect(cancelButton).toBeTruthy()

    await cancelButton!.trigger('click')

    // Modal ist geschlossen
    expect((wrapper.vm as any).showExpenseModal).toBe(false)
  })
})