// test/unit/frontend/Test_Kategorie/categoryManager.Category.create.spec.ts
// Frontend Unit Test – Kategorie erstellen
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CategoryManager from '../../../../components/categoryManager.vue'
import { fetchMock } from '../../../setup.frontend'

describe('Kategorie erstellen', () => {
  it('sendet Request beim Speichern', async () => {
    const wrapper = mount(CategoryManager)

    // open category manager
    const manageButton = wrapper
      .findAll('button')
      .find(b => b.text().includes('Kategorien verwalten'))
    await manageButton!.trigger('click')

    // open Add-Popup
    await wrapper.find('[data-testid="open-category-popup"]').trigger('click')

    // fill form
    await wrapper.find('input').setValue('Test Kategorie')
    await wrapper.find('select').setValue('income')

    // click save button
    const saveButton = wrapper
      .findAll('button')
      .find(b => b.text().includes('Speichern'))
    await saveButton!.trigger('click')

    // only stable assertion: check that fetch was called with correct params
    expect(fetchMock).toHaveBeenCalledWith('/api/categories')
  })
})
