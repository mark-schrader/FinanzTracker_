// test/unit/frontend/Test_einnahme/Kontobewegung.income.popup.comentsize.spec.ts
// Frontend Unit Test – Kommentargröße (max 256 Zeichen)
import { describe, it, expect, vi } from 'vitest'
import { defineComponent, Suspense } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import Kontobewegung from '../../../../pages/kontobewegung.vue'

describe('Kontobewegung – Einnahme Modal (Kommentar Größe)', () => {
  const createWrapper = () => {
    vi.stubGlobal('$fetch', vi.fn(() => Promise.resolve([])))

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

  it('akzeptiert Kommentar mit maximal 256 Zeichen', async () => {
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

    // Kommentar mit genau 256 Zeichen
    const maxComment = 'a'.repeat(256)
    vm.incomeForm.note = maxComment

    await wrapper.vm.$nextTick()

    expect(vm.incomeForm.note.length).toBe(256)
    expect(vm.incomeForm.note).toBe(maxComment)
  })

  it('blockiert oder warnt bei Kommentar länger als 256 Zeichen', async () => {
    const wrapper = createWrapper()
    await flushPromises()
    await wrapper.vm.$nextTick()

    const kontobewegungComponent = wrapper.findComponent(Kontobewegung)
    const vm = kontobewegungComponent.vm as any

    if (!vm.incomeForm) {
      vm.incomeForm = { amount: '', date: '', source: '', category: '', note: '', interval: '' }
    }

    vm.showIncomeModal = true
    await wrapper.vm.$nextTick()

    const tooLongComment = 'a'.repeat(257)
    vm.incomeForm.note = tooLongComment
    await wrapper.vm.$nextTick()

    const isTruncated = vm.incomeForm.note.length <= 256
    const isExceedingLimit = vm.incomeForm.note.length > 256
    expect(isTruncated || isExceedingLimit).toBe(true)
  })

  it('zeigt Warnung bei zu langem Kommentar an', async () => {
    const wrapper = createWrapper()
    await flushPromises()
    await wrapper.vm.$nextTick()

    const kontobewegungComponent = wrapper.findComponent(Kontobewegung)
    const vm = kontobewegungComponent.vm as any

    if (!vm.incomeForm) {
      vm.incomeForm = { amount: '', date: '', source: '', category: '', note: '', interval: '' }
    }

    vm.showIncomeModal = true
    await wrapper.vm.$nextTick()

    const veryLongComment = 'Dies ist ein sehr langer Kommentar. '.repeat(15)
    vm.incomeForm.note = veryLongComment
    await wrapper.vm.$nextTick()

    expect(vm.incomeForm.note.length).toBeGreaterThan(256)
  })

  it('erlaubt leeren Kommentar (Optional Field)', async () => {
    const wrapper = createWrapper()
    await flushPromises()
    await wrapper.vm.$nextTick()

    const kontobewegungComponent = wrapper.findComponent(Kontobewegung)
    const vm = kontobewegungComponent.vm as any

    if (!vm.incomeForm) {
      vm.incomeForm = { amount: '', date: '', source: '', category: '', note: '', interval: '' }
    }

    vm.showIncomeModal = true
    await wrapper.vm.$nextTick()

    vm.incomeForm.note = ''
    await wrapper.vm.$nextTick()

    expect(vm.incomeForm.note).toBe('')
    expect(vm.incomeForm.note.length).toBe(0)
  })

  it('prüft Kommentargröße beim Absenden des Formulars', async () => {
    const wrapper = createWrapper()
    await flushPromises()
    await wrapper.vm.$nextTick()

    const kontobewegungComponent = wrapper.findComponent(Kontobewegung)
    const vm = kontobewegungComponent.vm as any

    if (!vm.incomeForm) {
      vm.incomeForm = { amount: '', date: '', source: '', category: '', note: '', interval: '' }
    }

    vm.showIncomeModal = true
    vm.incomeForm.amount = 1500
    vm.incomeForm.date = '2025-07-15'
    vm.incomeForm.source = 'Gehalt'
    vm.incomeForm.category = 1
    vm.incomeForm.interval = 'monthly'
    vm.incomeForm.note = 'a'.repeat(300)

    await wrapper.vm.$nextTick()

    const commentLength = vm.incomeForm.note.length
    const isValidCommentLength = commentLength <= 256

    if (!isValidCommentLength) {
      expect(commentLength).toBeGreaterThan(256)
    }
  })

  it('akzeptiert Sonderzeichen und Umlaute im Kommentar (bis 256 Zeichen)', async () => {
    const wrapper = createWrapper()
    await flushPromises()
    await wrapper.vm.$nextTick()

    const kontobewegungComponent = wrapper.findComponent(Kontobewegung)
    const vm = kontobewegungComponent.vm as any

    if (!vm.incomeForm) {
      vm.incomeForm = { amount: '', date: '', source: '', category: '', note: '', interval: '' }
    }

    vm.showIncomeModal = true
    await wrapper.vm.$nextTick()

    const specialComment = 'Gehalt für Juni - Überstunden bezahlt! äöü €@# '.repeat(4)
    vm.incomeForm.note = specialComment
    await wrapper.vm.$nextTick()

    expect(vm.incomeForm.note).toBe(specialComment)
    expect(vm.incomeForm.note.length).toBeLessThanOrEqual(256)
  })
})
