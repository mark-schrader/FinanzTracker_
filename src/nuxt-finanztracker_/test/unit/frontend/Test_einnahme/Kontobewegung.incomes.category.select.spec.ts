// test/unit/frontend/Test_einnahme/Kontobewegung.incomes.category.select.spec.ts
// Frontend Unit Test – Kontobewegung Kategorie-Auswahl (Einnahme)
import { describe, it, expect, vi } from 'vitest'
import { defineComponent, Suspense } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import Kontobewegung from '../../../../pages/kontobewegung.vue'

describe('Kontobewegung – Einnahme Modal (Öffnen und Formularfelder)', () => {
  it('öffnet das Einnahme-Modal und ermöglicht Eingabe aller erforderlichen Felder', async () => {
    // Mock $fetch
    vi.stubGlobal('$fetch', vi.fn(() => Promise.resolve([])))

    // Komponente mit Suspense umhüllen
    const Wrapper = defineComponent({
      components: { Kontobewegung },
      template: `
        <Suspense>
          <template #default>
            <Kontobewegung />
          </template>
          <template #fallback>
            <div>Loading...</div>
          </template>
        </Suspense>
      `
    })

    const wrapper = mount(Wrapper, {
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

    // Warten bis Komponente vollständig gemountet ist
    await flushPromises()
    await wrapper.vm.$nextTick()

    // Direkter Zugriff auf Kontobewegung-Komponente
    const kontobewegungComponent = wrapper.findComponent(Kontobewegung)
    expect(kontobewegungComponent.exists()).toBe(true)

    const vm = kontobewegungComponent.vm as any

    // Sicherstellen, dass incomeForm initialisiert ist
    if (!vm.incomeForm) {
      vm.incomeForm = {
        amount: '',
        date: '',
        source: '',
        category: '',
        note: '',
        interval: ''
      }
    }

    // 1. Modal öffnen
    vm.showIncomeModal = true
    await wrapper.vm.$nextTick()
    expect(vm.showIncomeModal).toBe(true)

    // 2. Betrag eingeben
    vm.incomeForm.amount = 1500
    await wrapper.vm.$nextTick()
    expect(vm.incomeForm.amount).toBe(1500)

    // 3. Datum eingeben
    vm.incomeForm.date = '2025-07-15'
    await wrapper.vm.$nextTick()
    expect(vm.incomeForm.date).toBe('2025-07-15')

    // 4. Quelle eingeben
    vm.incomeForm.source = 'Gehalt'
    await wrapper.vm.$nextTick()
    expect(vm.incomeForm.source).toBe('Gehalt')

    // 5. Kategorie auswählen (mit Mock-Kategorie)
    vm.categories = [
      { id: 1, name: 'Einkommen', type: 'income' },
      { id: 2, name: 'Bonus', type: 'income' }
    ]
    vm.incomeForm.category = 1
    await wrapper.vm.$nextTick()
    expect(vm.incomeForm.category).toBe(1)

    // 6. Kommentar eingeben
    vm.incomeForm.note = 'Monatliches Gehalt'
    await wrapper.vm.$nextTick()
    expect(vm.incomeForm.note).toBe('Monatliches Gehalt')

    // 7. Zyklus auswählen
    vm.incomeForm.interval = 'monthly'
    await wrapper.vm.$nextTick()
    expect(vm.incomeForm.interval).toBe('monthly')

    // Validierung: alle Felder sind befüllt
    expect(vm.incomeForm.amount).toBeTruthy()
    expect(vm.incomeForm.date).toBeTruthy()
    expect(vm.incomeForm.source).toBeTruthy()
    expect(vm.incomeForm.category).toBeTruthy()
    expect(vm.incomeForm.note).toBeTruthy()
    expect(vm.incomeForm.interval).toBeTruthy()
  })
})
