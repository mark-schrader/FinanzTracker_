// src/nuxt-finanztracker_/test/unit/frontend/Category.create.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CategoryManager from '../../../components/categoryManager.vue'
import { fetchMock } from '../../setup.frontend' // Pfad ggf. anpassen

describe('Kategorie erstellen', () => {
  it('sendet POST Request beim Speichern', async () => {
    const wrapper = mount(CategoryManager)

    // Kategorien verwalten öffnen
    const manageButton = wrapper
      .findAll('button')
      .find(b => b.text().includes('Kategorien verwalten'))
    await manageButton!.trigger('click')
    await wrapper.vm.$nextTick()

    // Kategorie hinzufügen
    await wrapper.find('[data-testid="open-category-popup"]').trigger('click')
    await wrapper.vm.$nextTick()

    // Formular ausfüllen
    await wrapper.find('input').setValue('Test Kategorie')
    await wrapper.find('select').setValue('income')

    // Speichern
    const saveButton = wrapper
      .findAll('button')
      .find(b => b.text().includes('Speichern'))
    await saveButton!.trigger('click')

    // Erwartung
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/categories',
      expect.objectContaining({
        method: 'POST',
        body: {
          name: 'Test Kategorie',
          type: 'income',
          userId: 1
        }
      })
    )
  })
})
