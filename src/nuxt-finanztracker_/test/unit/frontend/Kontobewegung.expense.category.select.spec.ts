// src/nuxt-finanztracker_/test/unit/frontend/Kontobewegung.expense.category.select.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Kontobewegung from '../../../pages/kontobewegung.vue'

describe('Frontend Unit: Kategorie-Auswahl bei Ausgabe', () => {
  it('zeigt ein Dropdown zur Kategorieauswahl bei Ausgabe', async () => {
    const wrapper = mount(Kontobewegung)

    // Ausgabe-Modal öffnen
    ;(wrapper.vm as any).showExpenseModal = true
    await wrapper.vm.$nextTick()

    const selects = wrapper.findAll('select')
    expect(selects.length).toBeGreaterThan(0)
  })
})