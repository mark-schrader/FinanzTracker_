// src/nuxt-finanztracker_/test/unit/frontend/Kontobewegung.incomes.category.select.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Kontobewegung from '../../../pages/kontobewegung.vue'

describe('Frontend Unit: Kategorie-Auswahl bei Einnahme', () => {
  it('zeigt ein Dropdown zur Kategorieauswahl bei Einnahme', async () => {
    const wrapper = mount(Kontobewegung)

    // Einnahme-Modal öffnen
    ;(wrapper.vm as any).showIncomeModal = true
    await wrapper.vm.$nextTick()

    const selects = wrapper.findAll('select')
    expect(selects.length).toBeGreaterThan(0)
  })
})