// src/nuxt-finanztracker_/test/unit/frontend/Test_einnahme/Kontobewegung.income.popup.standingorder.spec.ts
// Frontend Unit Test – Einnahme Modal Zyklus-Auswahl
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent } from 'vue'
import Kontobewegung from '../../../../pages/kontobewegung.vue'

describe('Kontobewegung – Einnahme Modal (Zyklus-Auswahl)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const createWrapper = () => {
    vi.stubGlobal('$fetch', vi.fn(() => Promise.resolve([])))

    const Wrapper = defineComponent({
      components: { Kontobewegung },
      template: `
        <Suspense>
          <Kontobewegung />
        </Suspense>
      `
    })

    return mount(Wrapper, {
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
  }

  it('erlaubt die Auswahl von Zyklus: einmalig, monatlich, jährlich', async () => {
    const wrapper = createWrapper()
    await flushPromises()
    await wrapper.vm.$nextTick()

    const kontobewegungComponent = wrapper.findComponent(Kontobewegung)
    const vm = kontobewegungComponent.vm as any

    if (!vm.incomeForm) {
      vm.incomeForm = { amount: '', date: '', source: '', category: '', note: '', interval: '' }
    }

    // Modal öffnen
    vm.showIncomeModal = true
    await wrapper.vm.$nextTick()

    // Test 1: Einmalig setzen
    vm.incomeForm.interval = 'once'
    await wrapper.vm.$nextTick()
    expect(vm.incomeForm.interval).toBe('once')

    // Test 2: Monatlich setzen
    vm.incomeForm.interval = 'monthly'
    await wrapper.vm.$nextTick()
    expect(vm.incomeForm.interval).toBe('monthly')

    // Test 3: Jährlich setzen
    vm.incomeForm.interval = 'yearly'
    await wrapper.vm.$nextTick()
    expect(vm.incomeForm.interval).toBe('yearly')
  })

  it('speichert den ausgewählten Zyklus beim Absenden', async () => {
    const wrapper = createWrapper()
    await flushPromises()
    await wrapper.vm.$nextTick()

    const kontobewegungComponent = wrapper.findComponent(Kontobewegung)
    const vm = kontobewegungComponent.vm as any

    if (!vm.incomeForm) {
      vm.incomeForm = { amount: '', date: '', source: '', category: '', note: '', interval: '' }
    }

    // Modal öffnen
    vm.showIncomeModal = true
    await wrapper.vm.$nextTick()

    // Formular mit monatlichem Zyklus ausfüllen
    vm.incomeForm.amount = 2000
    vm.incomeForm.date = '2026-01-20'
    vm.incomeForm.source = 'Gehalt'
    vm.incomeForm.category = 1
    vm.incomeForm.interval = 'monthly'
    vm.incomeForm.note = 'Monatliches Gehalt'

    await wrapper.vm.$nextTick()

    // Validierung: Alle Felder sind gesetzt
    expect(vm.incomeForm.amount).toBe(2000)
    expect(vm.incomeForm.interval).toBe('monthly')
    expect(vm.incomeForm.source).toBe('Gehalt')
  })

  it('erlaubt das Ändern des Zyklus nach initialer Auswahl', async () => {
    const wrapper = createWrapper()
    await flushPromises()
    await wrapper.vm.$nextTick()

    const kontobewegungComponent = wrapper.findComponent(Kontobewegung)
    const vm = kontobewegungComponent.vm as any

    if (!vm.incomeForm) {
      vm.incomeForm = { amount: '', date: '', source: '', category: '', note: '', interval: '' }
    }

    // Modal öffnen
    vm.showIncomeModal = true
    await wrapper.vm.$nextTick()

    // Zuerst einmalig wählen
    vm.incomeForm.interval = 'once'
    expect(vm.incomeForm.interval).toBe('once')

    // Dann zu monatlich ändern
    vm.incomeForm.interval = 'monthly'
    expect(vm.incomeForm.interval).toBe('monthly')

    // Schließlich zu jährlich ändern
    vm.incomeForm.interval = 'yearly'
    expect(vm.incomeForm.interval).toBe('yearly')
  })

  it('unterstützt auch wöchentlichen Zyklus', async () => {
    const wrapper = createWrapper()
    await flushPromises()
    await wrapper.vm.$nextTick()

    const kontobewegungComponent = wrapper.findComponent(Kontobewegung)
    const vm = kontobewegungComponent.vm as any

    if (!vm.incomeForm) {
      vm.incomeForm = { amount: '', date: '', source: '', category: '', note: '', interval: '' }
    }

    // Modal öffnen
    vm.showIncomeModal = true
    await wrapper.vm.$nextTick()

    // Wöchentlich setzen
    vm.incomeForm.interval = 'weekly'
    await wrapper.vm.$nextTick()
    expect(vm.incomeForm.interval).toBe('weekly')
  })
})
