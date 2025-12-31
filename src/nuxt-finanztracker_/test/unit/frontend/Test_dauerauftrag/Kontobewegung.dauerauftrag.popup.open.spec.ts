// test/unit/frontend/Test_dauerauftrag/Kontobewegung.dauerauftrag.popup.open.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Kontobewegung from '../../../../pages/kontobewegung.vue'

describe('Unit: Kontobewegung – Dauerauftrag Modal öffnen', () => {
  it('öffnet das Dauerauftrag-Verwaltungsmodal', async () => {
    const wrapper = mount(Kontobewegung) 

    const btn = wrapper 
      .findAll('button')
      .find(b => b.text().includes('Daueraufträge verwalten')) // Modal Button finden

    await btn!.trigger('click') // Modal-Button klicken
    await wrapper.vm.$nextTick() 

    expect(wrapper.text()).toContain('Daueraufträge verwalten') // Modal-Inhalt prüfen
    expect((wrapper.vm as any).showRecurringModal).toBe(true) // Modal-Status prüfen
  })
})